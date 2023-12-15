import {
  ArrayInput,
  BooleanInput,
  DateInput,
  Edit,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";

export const OrderEdit = () => (
  <Edit>
    <SimpleForm>
      <ArrayInput source="products">
        <SimpleFormIterator>
          <TextInput source="id" />
          <TextInput source="name" />
          <TextInput source="price" />
          <TextInput source="imageName" />
          <DateInput source="date" />
          <BooleanInput source="inStock" />
          <TextInput source="brand" />
          <TextInput source="collection" />
          <TextInput source="model" />
          <TextInput source="material" />
          <TextInput source="weight" />
          <TextInput source="country" />
          <TextInput source="quantity" />
          <NumberInput source="quantityInOrder" />
        </SimpleFormIterator>
      </ArrayInput>
      <NumberInput source="totalPrice" />
      <ReferenceInput source="user_id" reference="user" />
      <TextInput source="status" />
      <TextInput source="reasonCancel" />
      <DateInput source="date" />
      <TextInput source="id" />
    </SimpleForm>
  </Edit>
);

import {
  ArrayField,
  ChipField,
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  SingleFieldList,
  TextField,
} from "react-admin";

export const OrderList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ArrayField source="products">
        <SingleFieldList>
          <ChipField source="id" />
        </SingleFieldList>
      </ArrayField>
      <NumberField source="totalPrice" />
      <ReferenceField source="user_id" reference="user" />
      <TextField source="status" />
      <TextField source="reasonCancel" />
      <DateField source="date" />
      <TextField source="id" />
    </Datagrid>
  </List>
);
