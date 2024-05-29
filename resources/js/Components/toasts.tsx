import { PageProps } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { ExternalToast, Toaster, toast as toastManager } from "sonner";

import React, { useEffect } from "react";

const Manager: React.FC = () => {

    const { toast } = usePage<PageProps>().props;

    useEffect(() => {
        if (toast === null || toast === undefined) {
            return;
        }

        // build toast
        const toastData: ExternalToast = {
            description: toast.description,
            duration: toast.timeout,
            action: undefined
        };

        if (toast.action) {
            toastData.action = {
                label: toast.action.label,
                onClick: e => {
                    e.preventDefault();
                    if (toast.action) {
                        router.visit(toast.action.redirect);
                    }
                }
            };
        }

        // show toast
        switch (toast.type) {
            case "success": {
                toastManager.success(toast.title, toastData);
                break;
            }
            case "danger": {
                toastManager.error(toast.title, toastData);
                break;
            }
            case "info":
            case "warning": {
                toastManager.message(toast.title, toastData);
            }
        }
    }, [toast]);

    return <Toaster position="top-center" richColors />;
};

export default Manager;
