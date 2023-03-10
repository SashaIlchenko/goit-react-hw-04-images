import { useState } from "react";
import { BsSearch } from "react-icons/bs"
import { Header, SearchForm, SearchBtn, BtnLabel, FormInput } from "./Searchbar.styled";

export default function SearchBar({ onSubmit }) {
    const [imageName, setImageName] = useState('');
    const handleChange = evt => {
        setImageName(evt.currentTarget.value.toLowerCase());
    };
    const handleSubmit = evt => {
        evt.preventDefault();
        onSubmit(imageName);
        setImageName('');
    };
    return (<Header>
        <SearchForm onSubmit={handleSubmit}>
            <SearchBtn type="submit"><BsSearch />
                <BtnLabel>Search</BtnLabel>
            </SearchBtn>

            <FormInput
                onChange={handleChange}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                name="imageName"
                value={imageName} />
        </SearchForm>
    </Header>);
}
