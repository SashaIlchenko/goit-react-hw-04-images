import { Component } from "react";
import { BsSearch } from "react-icons/bs"
import { Header, SearchForm, SearchBtn, BtnLabel, FormInput } from "./Searchbar.styled";
export default class SearhForm extends Component {
    state = {
        imageName: ''
    }
    handleChange = evt => {
        this.setState({ imageName: evt.currentTarget.value.toLowerCase() })
    }
    handleSubmit = evt => {
        evt.preventDefault();
        this.props.onSubmit(this.state.imageName);
        this.setState({ imageName: '' })
    }
    render() {
        return (< Header>
            <SearchForm onSubmit={this.handleSubmit}  >
                <SearchBtn type="submit"><BsSearch />
                    <BtnLabel>Search</BtnLabel>
                </SearchBtn>

                <FormInput
                    onChange={this.handleChange}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    name="imageName"
                    value={this.state.imageName}
                />
            </SearchForm>
        </ Header>)

    }
}