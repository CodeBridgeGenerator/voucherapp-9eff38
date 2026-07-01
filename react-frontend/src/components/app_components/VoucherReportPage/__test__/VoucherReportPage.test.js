import React from "react";
import { render, screen } from "@testing-library/react";

import VoucherReportPage from "../VoucherReportPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders voucherReport page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <VoucherReportPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("voucherReport-datatable")).toBeInTheDocument();
    expect(screen.getByRole("voucherReport-add-button")).toBeInTheDocument();
});
