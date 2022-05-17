# Forms

This module provides an easy way to setup forms. It manages
all form data and provides bi-directional binding of the data
to the fields.

Next to managing the form it also provides all kinds of input
components with automatic validations.

## Example
``` javascript
    <FormProvider
      disabled={disabled}
      data={myDataObject}
      onChange={onChange}
      onSubmit={onSubmit}
      onCanSubmit={onCanSubmit}>
        <Field id="lastname" required />
        <Field id="middlename" />
        <Field id="initials" required />
        <ChoiceField id="gender" required options={['Male', 'Female', 'Other']} />
        <DateField id="birthdate" required />
    </FormProvider>
```