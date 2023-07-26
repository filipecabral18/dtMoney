import * as Dialog from '@radix-ui/react-dialog';
import { X } from "phosphor-react";
import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import { useForm, Controller } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const TransactionSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

type TransctionFormInputs = z.infer<typeof TransactionSchema>;

export function NewTransactionModal() {
    const { register, handleSubmit, formState: { isSubmitting }, control } = useForm<TransctionFormInputs>({
        resolver: zodResolver(TransactionSchema),
        defaultValues: {
            type: 'income'
        }
    })
    function handleNewTransaction(data: TransctionFormInputs) {
        console.log(data)
    }

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Dialog.Title>Nova Transação</Dialog.Title>
                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form onSubmit={handleSubmit(handleNewTransaction)}>
                    <input
                        type="text"
                        placeholder="Descrição"
                        {...register('description')}
                    />
                    <input
                        type="number"
                        placeholder="Preço"
                        {...register('price', { valueAsNumber: true })}
                    />
                    <input
                        type="text"
                        placeholder="Categoria"
                        {...register('category')}
                    />
                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => {
                            return (
                                <TransactionType onValueChange={(value) => field.onChange(value as TransctionFormInputs['type'])} value={field.value}>
                                    <TransactionTypeButton variant="income" value="income">
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypeButton>
                                    <TransactionTypeButton variant="outcome" value="outcome">
                                        <ArrowCircleDown size={24} />
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />
                    <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                    </button>
                </form>
            </Content>
        </Dialog.Portal>
    );
}