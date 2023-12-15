import { BooleanField, Datagrid, EmailField, List, TextField } from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="surname" />
            <TextField source="patronymic" />
            <TextField source="login" />
            <EmailField source="email" />
            <TextField source="password" />
            <TextField source="password_repeat" />
            <BooleanField source="rules" />
            <BooleanField source="admin" />
            <TextField source="id" />
        </Datagrid>
    </List>
);

import { BooleanInput, Edit, SimpleForm, TextInput } from 'react-admin';

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="surname" />
            <TextInput source="patronymic" />
            <TextInput source="login" />
            <TextInput source="email" />
            <TextInput source="password" />
            <TextInput source="password_repeat" />
            <BooleanInput source="rules" />
            <TextInput source="id" />
            <BooleanInput source="admin" />
        </SimpleForm>
    </Edit>
);