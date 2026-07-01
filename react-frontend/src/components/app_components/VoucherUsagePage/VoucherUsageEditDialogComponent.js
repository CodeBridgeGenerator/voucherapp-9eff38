/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
const statusOptions = [
    {
        "name": "Redeemed",
        "value": "Redeemed"
    }
];

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const VoucherUsageEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [voucherCode, setVoucherCode] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount voucher
                    client
                        .service("voucher")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleVoucherId } })
                        .then((res) => {
                            setVoucherCode(res.data.map((e) => { return { name: e['voucherCode'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Voucher", type: "error", message: error.message || "Failed get voucher" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            voucherCode: _entity?.voucherCode?._id,
customerName: _entity?.customerName,
customerEmail: _entity?.customerEmail,
transactionAmount: _entity?.transactionAmount,
discountAmount: _entity?.discountAmount,
status: _entity?.status,
        };

        setLoading(true);
        try {
            
        await client.service("voucherUsage").patch(_entity._id, _data);
        const eagerResult = await client
            .service("voucherUsage")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "voucherCode",
                    service : "voucher",
                    select:["voucherCode"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info voucherUsage updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const voucherCodeOptions = voucherCode.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Voucher Usage" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="voucherUsage-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="voucherCode">Voucher Code:</label>
                <Dropdown id="voucherCode" value={_entity?.voucherCode?._id} optionLabel="name" optionValue="value" options={voucherCodeOptions} onChange={(e) => setValByKey("voucherCode", {_id : e.value})}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["voucherCode"]) && (
              <p className="m-0" key="error-voucherCode">
                {error["voucherCode"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="customerName">Customer Name:</label>
                <InputText id="customerName" className="w-full mb-3 p-inputtext-sm" value={_entity?.customerName} onChange={(e) => setValByKey("customerName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["customerName"]) && (
              <p className="m-0" key="error-customerName">
                {error["customerName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="customerEmail">Customer Email:</label>
                <InputText id="customerEmail" className="w-full mb-3 p-inputtext-sm" value={_entity?.customerEmail} onChange={(e) => setValByKey("customerEmail", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["customerEmail"]) && (
              <p className="m-0" key="error-customerEmail">
                {error["customerEmail"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="transactionAmount">Transaction Amount:</label>
                <InputNumber tooltip="Use only numbers" id="transactionAmount" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.transactionAmount} onValueChange={(e) => setValByKey("transactionAmount", e.value)} useGrouping={false}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["transactionAmount"]) && (
              <p className="m-0" key="error-transactionAmount">
                {error["transactionAmount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="discountAmount">Discount Amount:</label>
                <InputNumber tooltip="Use only numbers" id="discountAmount" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.discountAmount} onValueChange={(e) => setValByKey("discountAmount", e.value)} useGrouping={false}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["discountAmount"]) && (
              <p className="m-0" key="error-discountAmount">
                {error["discountAmount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <Dropdown id="status" value={_entity?.status} options={statusOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("status", e.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) && (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(VoucherUsageEditDialogComponent);
