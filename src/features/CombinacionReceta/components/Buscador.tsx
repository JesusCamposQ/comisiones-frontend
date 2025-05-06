import React from 'react';
import { useForm } from 'react-hook-form';
import { filtroCombinacionRecetaI } from '../interfaces/comisiones.interface';

export const Buscador = ({
    setFiltro,
}: {
    setFiltro: (data: filtroCombinacionRecetaI) => void;
}) => {
    const { register, getValues, setValue } = useForm<filtroCombinacionRecetaI>({
        defaultValues: {
            tipoLente: '',
            material: '',
            tratamiento: '',
            marcaLente: '',
            tipoColorLente: '',
            rango: '',
            colorLente: '',
        },
    });

    const handleInputChange = (field: keyof filtroCombinacionRecetaI) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setValue(field, event.target.value); 
        const nuevosValores = {
            ...getValues(),
            [field]: event.target.value,
        };
        setFiltro(nuevosValores); 
    };

    return (
        <div>
            <h2>Buscador de Lentes</h2>
            <form>
                <input placeholder="tipo Lente" {...register('tipoLente')} onChange={handleInputChange('tipoLente')} />
                <input placeholder="Material" {...register('material')} onChange={handleInputChange('material')} />
                <input placeholder="Tratamiento" {...register('tratamiento')} onChange={handleInputChange('tratamiento')} />
                <input placeholder="Marca" {...register('marcaLente')} onChange={handleInputChange('marcaLente')} />
                <input placeholder="Tipo Color Lente" {...register('tipoColorLente')} onChange={handleInputChange('tipoColorLente')} />
                <input placeholder="Rangos" {...register('rango')} onChange={handleInputChange('rango')} />
                <input placeholder="Color" {...register('colorLente')} onChange={handleInputChange('colorLente')} />
            </form>
        </div>
    );
};
