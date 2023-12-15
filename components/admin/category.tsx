
import { Datagrid, List, TextField, Edit, SimpleForm, TextInput, Create } from 'react-admin';

export const CategoryList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="imageUrl" />
        </Datagrid>
    </List>
);

export const CategoryEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="name" />
            <TextInput source="imageUrl" />
        </SimpleForm>
    </Edit>
);


export const CategoryCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="name" />
            <TextInput source="imageUrl" />
        </SimpleForm>
    </Create>
);