import React from "react";
import { render, screen } from "@testing-library/react";

import VoucherUsagePage from "../VoucherUsagePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders voucherUsage page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <VoucherUsagePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("voucherUsage-datatable")).toBeInTheDocument();
    expect(screen.getByRole("voucherUsage-add-button")).toBeInTheDocument();
});
