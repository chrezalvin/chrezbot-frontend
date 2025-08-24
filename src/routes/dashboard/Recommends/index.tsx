import debug from "debug";

import { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, DropdownButton, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { Recommend } from "../../../API/models";
import { getAllRecommends, deleteRecommend, addRecommend } from "../../../API/service/RecommendService";
import { DeleteRecommendModal } from "./DeleteRecommendModal";
import { RecommendCard } from "./RecommendsCard";
import { AddRecommendModal } from "./AddRecommendModal";
import admin from "../../../assets/icons/edit_mode.svg";
import plus from "../../../assets/icons/plus.svg";

const log = debug("app:Recommends");

function Recommends(){
    const [recommends, setRecommend] = useState<Recommend[]>([]);
    const [search, setSearch] = useState<string>("");
    const [isCreatingRecommend, setIsCreatingRecommend] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [currentCategory, setCurrentCategory] = useState<string | null>(null);
    
    const [selectedDeleteRecommended, setSelectedDeleteRecommended] = useState<Recommend>();
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [addError, setAddError] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showAddPreviewModal, setShowAddPreviewModal] = useState<boolean>(false);

    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [addLinkError, setAddLinkError] = useState<string | null>(null);
    const [addTitleError, setAddTitleError] = useState<string | null>(null);
    const [addDescriptionError, setAddDescriptionError] = useState<string | null>(null);
    const [addCategoriesError, setAddCategoriesError] = useState<string | null>(null);
    const [addFileError, setAddFileError] = useState<string | null>(null);

    const [addTitle, setAddTitle] = useState<string>("");
    const [addDescription, setAddDescription] = useState<string>("");
    const [addLink, setAddLink] = useState<string>("");
    const [addCategories, setAddCategories] = useState<string>("");
    const [addImage, setAddImage] = useState<File | null>(null);
    const [addShowPreview, setAddShowPreview] = useState<boolean>(false);

    const resetAddInputFields = () => {
        setAddTitle("");
        setAddDescription("");
        setAddLink("");
        setAddCategories("");
        setAddImage(null);
        setAddShowPreview(false);
        setAddLinkError(null);
        setAddTitleError(null);
        setAddDescriptionError(null);
        setAddCategoriesError(null);
        setAddFileError(null);
    }

    const addValidation = () => {
        let isValid = true;
        setAddLinkError(null);
        setAddTitleError(null);
        setAddDescriptionError(null);
        setAddCategoriesError(null);
        setAddFileError(null);

        // ensure title is not empty
        if (!addTitle.trim()) {
            setAddTitleError("Title is required");
            isValid = false;
        }
        
        // ensure description is not empty
        if (!addDescription.trim()) {
            setAddDescriptionError("Description is required");
            isValid = false;
        }

        // ensure link is a valid URL if provided
        if (addLink && !/^https?:\/\/.+/.test(addLink)) {
            setAddLinkError("Invalid link format");
            isValid = false;
        }

        const checkCategories = addCategories.trim().split(",").map(cat => cat.trim());

        // ensure categories are not empty
        if (checkCategories.length === 0 || checkCategories.some(cat => !cat)) {
            setAddCategoriesError("Categories cannot be empty or blank");
            isValid = false;
        }

        // ensure categories are unique
        if (new Set(checkCategories).size !== checkCategories.length) {
            setAddCategoriesError("Categories must be unique");
            isValid = false;
        }

        // ensure categories are below 5
        if (checkCategories.length > 5) {
            setAddCategoriesError("You can only add up to 5 categories");
            isValid = false;
        }

        // ensure category names are less than 10 chracters
        if (checkCategories.some(cat => cat.length > 10)) {
            setAddCategoriesError("Category names must be less than 10 characters");
            isValid = false;
        }

        if (addImage && !addImage.type.startsWith("image/")) {
            setAddFileError("File must be an image");
            isValid = false;
        }

        return isValid;
    }


    // all unique categories from all recommends
    const allCategories = recommends.reduce((acc, rec) => {
        if(rec.category){
            rec.category.forEach(cat => {
                if(!acc.includes(cat)){
                    acc.push(cat);
                }
            });
        }
        return acc;
    }, [] as string[]);

    // filtered recommends based on search and category
    const filteredRecommends = recommends.filter(rec => {
        const matchesSearch = rec.title.toLowerCase().includes(search.toLowerCase()) || rec.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = currentCategory ? rec.category?.includes(currentCategory) : true;
        return matchesSearch && matchesCategory;
    });

    async function handleGetRecommend(): Promise<void>{
        setIsLoading(true);
        setError(null);

        try{
            log("Getting all recommends");
            
            const recs = await getAllRecommends();
            setRecommend(recs);

            log("Sucessfully get all recommends");
        }
        catch(e){
            if(e instanceof Error)
                setError(e.message);
            else{
                log(`Unknown error: ${e}`);
                setError("An unknown error occurred");
            }
        }
        finally{
            setIsLoading(false);
        }
    }

    async function handleDelete(): Promise<void> {
        if(!selectedDeleteRecommended) return;

        setIsDeleting(true);
        setDeleteError(null);

        try{
            log(`Deleting recommend with id ${selectedDeleteRecommended.recommend_id}`);
            await deleteRecommend(selectedDeleteRecommended.recommend_id);
            log("Successfully deleted recommend");

            // refresh recommends
            await handleGetRecommend();
            setSelectedDeleteRecommended(undefined);
        }
        catch(e){
            if(e instanceof Error)
                setDeleteError(e.message);
            else{
                log(`Unknown error: ${e}`);
                setDeleteError("An unknown error occurred");
            }
        }
        finally{
            setIsDeleting(false);
        }
    }

    async function handleAdd(): Promise<void> {
        setIsAdding(true);
        setAddError(null);
    
        try {
            await addRecommend({
                title: addTitle,
                description: addDescription,
                link: addLink,
                category: addCategories.split(","),
            }, addImage ? new Blob([addImage], { type: addImage.type }) : undefined);

            resetAddInputFields();
            setAddShowPreview(false);
            setIsCreatingRecommend(false);
    
        } catch (error) {
            if (error instanceof Error)
                setAddError(error.message);
            else {
                console.error(`Unknown error: ${error}`);
                setAddError("An unknown error occurred");
            }
        } finally {
            setIsCreating(false);
        }
    }

    useEffect(() => {
        handleGetRecommend();
    }, [])

    return (
        <>
            <DeleteRecommendModal
                show={selectedDeleteRecommended !== undefined}
                onHide={() => setSelectedDeleteRecommended(undefined)}
                recommend={selectedDeleteRecommended}
                isLoading={isDeleting}
                error={deleteError}
                onConfirmDelete={handleDelete}
            />
            {/* <AddRecommendModal
                show={isCreatingRecommend}
                onHide={() => setIsCreatingRecommend(false)}
                onSuccessful={handleGetRecommend}
                isLoading={isAdding}
                error={addError}
                onConfirm={handleAdd}

                fileError={addFileError}
                title={addTitle}
                description={addDescription}
                link={addLink}
                categories={addCategories}
                image={addImage}
                showPreview={addShowPreview}

                setTitle={setAddTitle}
                setDescription={setAddDescription}
                setLink={setAddLink}
                setCategories={setAddCategories}
                setImage={setAddImage}
                setShowPreview={setAddShowPreview}
            /> */}
            <Container className="m-0 w-100 h-100 position-relative" fluid>
                <Button 
                    variant={isEditMode ? "success" : "danger"}
                    className="position-absolute top-0 start-0" 
                    style={{height: "50px", width: "50px"}}
                    onClick={() => {setIsEditMode(!isEditMode)}}
                >
                    <img 
                        src={admin}
                        className="w-100 h-100"
                    />
                </Button>
                {
                    isEditMode && (
                    <Button 
                        variant="success"
                        className="position-absolute top-0 end-0" 
                        style={{height: "50px", width: "50px"}}
                        onClick={() => {setIsCreatingRecommend(true)}}
                    >
                        <img 
                            src={plus}
                            className="w-100 h-100"
                        />
                    </Button>
                    )
                }

                <Row>
                    <Col className="col-12 text-center">
                        <h1>Recommends</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <InputGroup className="mb-3 w-50">
                        <DropdownButton
                            variant="outline-secondary"
                            title={currentCategory ?? "All Categories"}
                            id="input-group-dropdown-1"
                        >
                            <Dropdown.Item 
                                href="#"
                                onClick={() => {setCurrentCategory(null);}}
                                active={currentCategory === null}
                            >All Categories</Dropdown.Item>
                            {
                                allCategories.map((cat) => {
                                    return (
                                        <Dropdown.Item 
                                            href="#"
                                            onClick={() => {setCurrentCategory(cat);}}
                                            active={currentCategory === cat}
                                        >{cat}</Dropdown.Item>
                                    )
                                })
                            }
                        </DropdownButton>
                            <Form.Control
                                placeholder="Search title or description"
                                aria-label="Search title or description"
                                aria-describedby="basic-addon2"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                {
                    isLoading ?
                    (
                        <Container className="w-100 h-100 d-flex justify-content-center align-items-center" fluid>
                            <Spinner />
                        </Container>
                    )
                    :
                    (
                        <Row className="g-3">
                            {
                                filteredRecommends.map((rec) => (
                                    <Col 
                                        lg={4} 
                                        key={rec.recommend_id}
                                    >
                                        <RecommendCard 
                                            recommend={rec}
                                            onSelectDelete={(recommend) => {setSelectedDeleteRecommended(recommend)}}
                                            allowEdit={isEditMode}
                                        />
                                    </Col>
                                ))
                            }
                        </Row>
                    )
                    
                }
            </Container>
        </>
    )
}

export default Recommends;