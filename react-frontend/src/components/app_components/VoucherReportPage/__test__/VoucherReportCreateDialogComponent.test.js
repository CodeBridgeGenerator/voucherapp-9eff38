import React from "react";
import { render, screen } from "@testing-library/react";

import VoucherReportCreateDialogComponent from "../VoucherReportCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders voucherReport create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <VoucherReportCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("voucherReport-create-dialog-component")).toBeInTheDocument();
});
