import {
  BooleanInput,
  DateInput,
  Edit,
  SimpleForm,
  TextInput,
  List,
  Datagrid,
  TextField,
  BooleanField,
  DateField,
  Create,
  ReferenceInput,
  ReferenceField,
  SelectInput,
} from "react-admin";

export const ProductEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <ReferenceInput source="category_id" reference="category"><SelectInput optionText={'name'}/></ReferenceInput>
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
    </SimpleForm>
  </Edit>
);

export const ProductList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="category_id" reference="category">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
      <TextField source="price" />
      <TextField source="imageName" />
      <DateField source="date" />
      <BooleanField source="inStock" />
      <TextField source="brand" />
      <TextField source="collection" />
      <TextField source="model" />
      <TextField source="material" />
      <TextField source="weight" />
      <TextField source="country" />
      <TextField source="quantity" />
    </Datagrid>
  </List>
);

export const ProductCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="id" />
      <ReferenceInput source="category_id" reference="category"><SelectInput optionText={'name'}/></ReferenceInput>
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
    </SimpleForm>
  </Create>
);
