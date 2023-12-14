"use client";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";

const RegistraionForm = () => {
  const regExpKT = RegExp(/^[А-Яа-я -]+$/);
  const regExpLT = RegExp(/^[A-Za-z -]+$/);
  const [serverError, setServerError] = useState("");
  const [serverSucssesful, setServerSucssesful] = useState<boolean>(false);
  const isUserExists = async (username:string) => {
    try {
      const response = await fetch(`http://localhost:8000/user?login=${username}`);
      const data = await response.json();
      return Array.isArray(data) && data.length > 0;
    } catch (error) {
      return false;
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          patronymic: "",
          login: "",
          email: "",
          password: "",
          password_repeat: "",
          rules: false,
          admin:false
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("* Обязательное поле")
            .matches(regExpKT, "* Кириллица, тире и пробелы"),
          surname: Yup.string()
            .required("* Обязательное поле")
            .matches(regExpKT, "* Кириллица, тире и пробелы"),
          patronymic: Yup.string().matches(
            regExpKT,
            "* Кириллица, тире и пробелы"
          ),
          login: Yup.string()
            .required("* Обязательное поле")
            .matches(regExpLT, "* Латиница, тире и пробелы"),
          email: Yup.string()
            .email("* Введите корректный Email")
            .required("* Обязательное поле"),
          password: Yup.string()
            .required("* Обязательное поле")
            .min(6, "Пароль должен содержать не менее 6 символов"),
          password_repeat: Yup.string()
            .required("* Повторите пароль")
            .oneOf([Yup.ref("password")], "* Пароли должны совпадать"),
          rules: Yup.boolean().required(
            "* Правила регистрации должны быть приняты"
          ),
        })}
        onSubmit={async (values) => {
          setServerError('')
          try {
            const userExists = await isUserExists(values.login);

            if (userExists) {
              setServerError("Данный пользователь уже существует.");
              return;
            }

            const response = await fetch("http://localhost:8000/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });

            if (!response.ok) {
              const data = await response.json();
              setServerError(data.message || "Произошла ошибка");
            } else{
              setServerSucssesful(true)
            }
          } catch (err: any) {
            setServerError("Произошла ошибка");
          }
        }}
      >
        {(values) => {
          return (
            <Form>
              <div>
                <label htmlFor="name">Имя</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component="div" />
              </div>

              <div>
                <label htmlFor="surname">Фамилия</label>
                <Field type="text" id="surname" name="surname" />
                <ErrorMessage name="surname" component="div" />
              </div>

              <div>
                <label htmlFor="patronymic">Отчество</label>
                <Field type="text" id="patronymic" name="patronymic" />
                <ErrorMessage name="patronymic" component="div" />
              </div>

              <div>
                <label htmlFor="login">Логин</label>
                <Field type="text" id="login" name="login" />
                <ErrorMessage name="login" component="div" />
              </div>

              <div>
                <label htmlFor="email">Эл. почта</label>
                <Field type="text" id="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>

              <div>
                <label htmlFor="password">Пароль</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>

              <div>
                <label htmlFor="password_repeat">Повторите пароль</label>
                <Field
                  type="password"
                  id="password_repeat"
                  name="password_repeat"
                />
                <ErrorMessage name="password_repeat" component="div" />
              </div>

              <div>
                <div>
                  <label>
                    <Field type="checkbox" name="rules" />Я согласен с{" "}
                    <span className={"link-style"}>правилами регистрации</span>
                  </label>
                </div>
                <ErrorMessage name="rules" component="div" />
              </div>

              <div>
                <button type="submit">Отправить</button>
              </div>
            </Form>
          );
        }}
      </Formik>
      {serverError && <div style={{ color: "red" }}>{serverError}</div>}
      {serverSucssesful ? <div>Аккаунт был успешно зарегестрирован.<br/> Пожалуйста авторизуйтесь.</div>: <></>}
    </div>
  );
};

export default RegistraionForm;
