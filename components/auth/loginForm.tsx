"use client";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  return (
    <>
      <Formik
        initialValues={{
          login: "",
          password: "",
        }}
        validationSchema={Yup.object({
          login: Yup.string().required("* Обязательное поле"),
          password: Yup.string()
            .required("* Обязательное поле")
            .min(6, "Пароль должен содержать не менее 6 символов"),
        })}
        onSubmit={async (values) => {
          try {
            const response = await signIn("credentials", {
              redirect: false,
              login: values.login,
              password: values.password,
              callbackUrl:`${window.location.origin}`
            });
            
            if (response?.error) {
              setServerError('Неправильный логин или пароль');
            } else {
              setServerError("");
            }
            if (response?.url) router.push(response.url);
          } catch (error) {
            setServerError("Ошибка входа.");
          }
        }}
      >
        {(values) => {
          return (
            <Form>
              <div>
                <label htmlFor="login">Логин</label>
                <Field type="text" id="login" name="login" />
                <ErrorMessage name="login" component="div" />
              </div>
              <div>
                <label htmlFor="password">Пароль</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <div>
                <button type="submit">Отправить</button>
              </div>
            </Form>
          );
        }}
      </Formik>
      {serverError && <div style={{ color: "red" }}>{serverError}</div>}
    </>
  );
};

export default LoginForm;
