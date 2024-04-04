import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 40px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 25px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 130px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InputRadio = styled.input`
  width: 40px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 20px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 5px;
  height: 20px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 50px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 545px;
  transition: background-color 0.3s ease;
  font-weight: bold;
  font-size: 16px;

  &:hover {
    background-color: #1a5aaf;
  }
`;

const handleSpeciesChange = (event, setSpecies) => {
  setSpecies(event.target.value);
};

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();
  const [species, setSpecies] = useState('Dog');

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.name.value = onEdit.name;
      user.phone.value = onEdit.phone;
      user.email.value = onEdit.email;
      user.pets_name.value = onEdit.pets_name;
      user.age.value = onEdit.age;
      user.weight.value = onEdit.weight;
      user.species.value = onEdit.species;
      user.breed.value = onEdit.breed;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.name.value ||
      !user.phone.value ||
      !user.email.value ||
      !user.pets_name.value ||
      !user.age.value ||
      !user.weight.value ||
      !user.species.value ||
      !user.breed.value
    ) {
      return toast.warn("Fill in all fields!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          name: user.name.value,
          phone: user.phone.value,
          email: user.email.value,
          pets_name: user.pets_name.value,
          age: user.age.value,
          weight: user.weight.value,
          species: user.species.value,
          breed: user.breed.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          name: user.name.value,
          phone: user.phone.value,
          email: user.email.value,
          pets_name: user.pets_name.value,
          age: user.age.value,
          weight: user.weight.value,
          species: user.species.value,
          breed: user.breed.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.name.value = "";
    user.phone.value = "";
    user.email.value = "";
    user.pets_name.value = "";
    user.age.value = "";
    user.weight.value = "";
    user.species.value = "";
    user.breed.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" type="text" aria-label="Name" />
      </InputArea>
      <InputArea>
        <Label htmlFor="phone">Phone</Label>
        <Input name="phone" id="phone" type="text" aria-label="Phone" />
      </InputArea>
      <InputArea>
        <Label htmlFor="email">Email</Label>
        <Input name="email" id="email" type="email" aria-label="Email" />
      </InputArea>
      <InputArea>
        <Label htmlFor="pets_name">Pet's name</Label>
        <Input name="pets_name" id="pets_name" type="text" aria-label="Pet's name" />
      </InputArea>
      <InputArea>
        <Label htmlFor="age">Age</Label>
        <Input name="age" id="age" type="number" aria-label="Age" />
      </InputArea>
      <InputArea>
        <Label htmlFor="weight">Weight (in kg)</Label>
        <Input name="weight" id="weight" type="number" aria-label="Weight" />
      </InputArea>
      <InputArea>
        <RadioContainer>
          <Label>Species: </Label>
          <InputRadio type="radio" name="species" value="Dog" checked={species === 'Dog'} onChange={(e) => handleSpeciesChange(e, setSpecies)} aria-label="Dog" />
          <RadioLabel>Dog</RadioLabel>
          <InputRadio type="radio" id="Cat" name="species" value="Cat" checked={species === 'Cat'} onChange={(e) => handleSpeciesChange(e, setSpecies)} aria-label="Cat" />
          <RadioLabel>Cat</RadioLabel>
        </RadioContainer>
      </InputArea>
      <InputArea>
        {species === 'Dog' && (
          <div>
            <Label>Breed: </Label>
            <select name="breed" aria-label="Dog Breed">
              <option>Labrador</option>
              <option>Bulldog</option>
              <option>Poodle</option>
              <option>Golden Retriever</option>
              <option>Beagle</option>
              <option>Dachshund</option>
              <option>Boxer</option>
              <option>German Shepherd</option>
              <option>Siberian Husky</option>
              <option>Rottweiler</option>
              <option>Schnauzer</option>
              <option>Pug</option>
              <option>Doberman</option>
              <option>Chihuahua</option>
              <option>Mixed Breed</option>
              <option>Other</option>
            </select>
          </div>
        )}

        {species === 'Cat' && (
          <div>
            <Label>Breed: </Label>
            <select name="breed" aria-label="Cat Breed">
              <option>Siamese</option>
              <option>Persian</option>
              <option>Maine Coon</option>
              <option>Ragdoll</option>
              <option>Bengal</option>
              <option>British Shorthair</option>
              <option>Scottish Fold</option>
              <option>Sphynx</option>
              <option>Abyssinian</option>
              <option>Birman</option>
              <option>Mixed Breed</option>
              <option>Other</option>
            </select>
          </div>
        )}
      </InputArea>
      <Button type="submit" aria-label="Save">SAVE</Button>
    </FormContainer>
  );
};

export default Form;
