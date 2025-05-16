import { SubmitHandler, useForm } from 'react-hook-form'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Datum } from '../interfaces/metas.interface'
import { Dispatch, SetStateAction } from 'react'

interface ModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    data: Datum;
}

export const ModalEditarMetas = ({ open, setOpen }: ModalProps) => {
    const { register, handleSubmit } = useForm()
    const onSubmit: SubmitHandler<any> = async (valores) => {
        console.log(valores)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Metas</DialogTitle>
                    <DialogDescription>
                        Puedes editar las metas de la sucursal seleccionada
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="sucursal">Sucursal</label>
                        <select {...register("sucursal")}>
                            <option value="">Seleccione una sucursal</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="monturaMasGafa">Montura + Gafa</label>
                        <input type="number" {...register("monturaMasGafa")} />
                    </div>
                    <div>
                        <label htmlFor="lenteDeContacto">Lente de Contacto</label>
                        <input type="number" {...register("lenteDeContacto")} />
                    </div>
                    <button type="submit">Guardar</button>
                </form>
            </DialogContent>
        </Dialog>

    )
}
