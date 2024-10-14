import { Dialog } from "@mui/material";
import { useState } from "react";

export default function SearchIdModal(id) {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <div className="flex flex-col p-6">
                <p className="text-sm text-gray-500">아이디는 {id} 입니다.</p>
            </div>
        </Dialog>
    );
}

