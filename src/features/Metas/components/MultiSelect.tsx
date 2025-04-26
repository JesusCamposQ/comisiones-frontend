import Select, { components, MultiValueGenericProps } from 'react-select';

interface SucursalOption {
    sucursal: string;
}
const sucursalOptions = [
    { sucursal: 'Sucursal 1' },
    { sucursal: 'Sucursal 2' },
    { sucursal: 'Sucursal 3' },
    { sucursal: 'Sucursal 4' },
    { sucursal: 'Sucursal 5' },
    { sucursal: 'Sucursal 6' },
];


const MultiValueContainer = (props: MultiValueGenericProps<SucursalOption>) => {
  return (
      <components.MultiValueContainer {...props} />
  );
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ MultiValueContainer }}
    styles={{
      multiValue: (base) => ({
        ...base,
        border: `2px dotted ${sucursalOptions[2].sucursal}`,
      }),
    }}
    isMulti
    options={sucursalOptions}
    name="sucursal"
  />
);