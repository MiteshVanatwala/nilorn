/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export enum GenericParameterAttributes {
    NONE = 'none',
    COVARIANT = 'covariant',
    CONTRAVARIANT = 'contravariant',
    VARIANCE_MASK = 'varianceMask',
    REFERENCE_TYPE_CONSTRAINT = 'referenceTypeConstraint',
    NOT_NULLABLE_VALUE_TYPE_CONSTRAINT = 'notNullableValueTypeConstraint',
    DEFAULT_CONSTRUCTOR_CONSTRAINT = 'defaultConstructorConstraint',
    SPECIAL_CONSTRAINT_MASK = 'specialConstraintMask',
}
