import {Dialog, DialogContent, DialogTitle, Link, Stack} from '@mui/material';
import {type FC, memo, useState} from 'react';

export const DemoDialog: FC = memo(() => {
    const [open, setOpen] = useState(true)

    return (
        <Dialog onClose={() => setOpen(false)} open={open} className="taDemoDialog" maxWidth="xl">
            <DialogTitle>Demo</DialogTitle>
            <DialogContent>
                <Stack gap={2}>
                    <Link href="https://github.com/stswoon/low-code-ui/blob/main/README.md">
                        GitHub Code and Architecture
                    </Link>
                    <video width="640" height="480" controls autoPlay muted style={{border: "1px solid blue"}}>
                        <source src="proof.mp4" type="video/mp4"/>
                    </video>
                </Stack>
            </DialogContent>
        </Dialog>
    );
});

DemoDialog.displayName = "DemoDialog";