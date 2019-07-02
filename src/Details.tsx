import React, { lazy } from "react";
import pet, { Photo, AnimalResponse } from "@frontendmasters/pet";
import { navigate, RouteComponentProps } from "@reach/router";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
const Modal = lazy(() => import("./Modal"));

type Props = RouteComponentProps<{ id: string }>;

class Details extends React.Component<Props> {
  public constructor(props: Props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.adopt = this.adopt.bind(this);
  }

  public state = {
    loading: true,
    showModal: false,
    name: "",
    animal: "",
    location: "",
    description: "",
    media: [] as Photo[],
    url: "",
    breed: ""
  }

  public componentDidMount() {
    if (!this.props.id) {
      navigate("/");
      return;
    }
    pet
      .animal(+this.props.id)
      .then(({ animal }: AnimalResponse) => {
        this.setState({
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${
            animal.contact.address.state
          }`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false,
          url: animal.url,
        });
      })
      .catch((err: Error) => this.setState({ error: err }));
  }

  public toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  public adopt() {
    navigate(this.state.url);
  }
  
  public render() {
    if (this.state.loading) {
      return <h1>loading … </h1>;
    }

    const {
      media,
      animal,
      breed,
      location,
      description,
      name,
      showModal
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                style={{ backgroundColor: theme }}
                onClick={this.toggleModal}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>
            {description}
            {
              showModal ? (
                <Modal>
                  <div>
                    <h1>Would you like to adopt {name}?</h1>
                    <div className="buttons">
                      <button onClick={this.adopt}>Yes</button>
                      <button onClick={this.toggleModal}>No</button>
                    </div>
                  </div>
                </Modal>
              ) : null
            }
          </p>
        </div>
      </div>
    );
  }
}

export default function DetailsErrorBoundary(props: Props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}