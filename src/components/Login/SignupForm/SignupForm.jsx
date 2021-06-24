import { Formik, Field, Form, ErrorMessage } from "formik";
import useUser from '../../../hooks/useUser'

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Ingresá una dirección de email válida'
    }
    if (!values.password) {
        errors.password = 'Requerido'
    }
    return errors;
}

const SignupForm = () => {
    const {loginUser, loginError, loginLoading} = useUser();

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={validate}
            onSubmit={values => {
                loginUser(values.email, values.password)
            }}
        >
            {({isValid}) => (
                <Form>
                    <label htmlFor='email' className='form-label my-0'>Email</label>
                    <Field id='email' name='email' type='email' className='form-control'/>
                    <ErrorMessage name='email' component='div' className='form-text text-danger'/>

                    <label htmlFor='password' className='form-label my-0'>Contraseña</label>
                    <Field id='password' name='password' type='password' className='form-control'/>
                    <ErrorMessage name='password' component='div' className='form-text text-danger'/>

                    <button 
                    type="submit" 
                    className={`btn btn-primary mt-2 ${loginLoading && 'loadingButton'}`} 
                    disabled={!isValid}
                    >Enviar</button>
                    
                    {loginError ?
                        <div className="mt-2 alert alert-danger" role="alert">
                            Email o contraseña incorrecta, inténtalo de nuevo
                        </div> :
                        null
                    }
                </Form>
            )}
        </Formik>
    );
};

export default SignupForm;