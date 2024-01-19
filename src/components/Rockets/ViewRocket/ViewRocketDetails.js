import { Modal, Button, Carousel } from 'react-bootstrap';
import '../ViewRocket/ViewRocketDetails.css';

const ViewRocketDetails = ({ show, onHide, rocket }) => {
    if (!rocket) {
        return null;
    }

    const { name, flickr_images, wikipedia } = rocket;

    return (
        <Modal show={show} onHide={onHide} dialogClassName="custom-modal">
            <Modal.Header className="custom-header" closeButton>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    {flickr_images && flickr_images.length > 1 ? (
                        <Carousel interval={1000 /* Set your desired interval in milliseconds */}>
                            {flickr_images.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img src={image} alt={`Slide ${index + 1}`} className="rocket-image" />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    ) : (
                        <div className="container">
                            <img src={flickr_images && flickr_images[0]} alt={name} className="rocket-image" />
                        </div>
                    )}
                    <div className="row rocketModel-info mt-3 custom-color">
                        <div className="col-sm-4">
                            <h5>Height</h5>
                            <p>{rocket.height.feet} Feet</p>
                        </div>
                        <div className="col-sm-4">
                            <h5>Diameter</h5>
                            <p>{rocket.diameter.feet} Feet</p>
                        </div>
                        <div className="col-sm-4">
                            <h5>Mass</h5>
                            <p>{rocket.mass.kg / 1000} Tonne</p>
                        </div>
                        <div className="col-sm-4">
                            <h5>First Flight</h5>
                            <p>{rocket.first_flight}</p>
                        </div>
                        <div className="col-sm-4">
                            <h5>Active</h5>
                            <p>{rocket.active ? `Yes` : `No`}</p>
                        </div>
                        <div className="col-sm-4">
                            <h5>Cost/Luanch</h5>
                            <p>{rocket.cost_per_launch / 1000000} Million</p>
                        </div>
                        <div className="additional-details">

                            <p>{rocket.description}</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        {wikipedia && (
                            <Button className='btn btn-custom-color ' onClick={() => window.open(wikipedia, '_blank')}>
                                Learn more from Wikipedia
                            </Button>
                        )}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ViewRocketDetails;
