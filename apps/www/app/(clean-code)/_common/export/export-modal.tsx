import { TableCell } from "@/app/_components/data-table/table-cells";
import FormCheckbox from "@/components/common/controls/form-checkbox";
import Modal from "@/components/common/modal";

import { Form } from "@gnd/ui/form";
import { ScrollArea } from "@gnd/ui/scroll-area";
import { Table, TableBody, TableRow } from "@gnd/ui/table";

import { useExportForm } from "./use-export";

interface Props {
    type;
    config?;
}
export default function ExportModal({ type, config }: Props) {
    const ctx = useExportForm(type, config);

    return (
        <Form {...ctx.form}>
            <Modal.Content size="sm">
                <Modal.Header title="Export" />
                <ScrollArea className="max-h-[40vh]">
                    <Table>
                        <TableBody>
                            {ctx.list?.map((ls, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <FormCheckbox
                                            control={ctx.form.control}
                                            name={`exports.${ls.valueNode}`}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TableCell.Primary>
                                            {ls?.title}
                                        </TableCell.Primary>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
                <Modal.Footer submitText="Export" onSubmit={ctx.startExport} />
            </Modal.Content>
        </Form>
    );
}
