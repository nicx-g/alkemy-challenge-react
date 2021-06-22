import {Formik, Field, Form} from 'formik';
import {useHistory} from 'react-router-dom';

const validate = values => {
    const errors = {};
    if (!values.search) {
        errors.email = 'Requerido';
    }
    return errors;
}

const SearchBar = () => {
    const history = useHistory();
    return(
        <Formik
            initialValues={{search: ''}}
            validate={validate}
            onSubmit={values => {
                let searchwithoutspaces = values.search.trim().split(' ').join('-')
                history.push(`search/${searchwithoutspaces}`)
            }}
        >
            {({isValid}) => (
                <Form className="my-3 py-3 border-bottom border-dark">
                <div className="input-group">
                    <Field 
                    type="text" 
                    name='search' 
                    placeholder='Busca tus héroes favoritos. Ej: Flash' 
                    className='form-control'/>
                    <button 
                    type="submit" 
                    className='input-group-text btn btn-primary'
                    disabled={!isValid}
                    >Buscar</button>
                </div>
            </Form>
            )}
        </Formik>
    )
}

export default SearchBar;