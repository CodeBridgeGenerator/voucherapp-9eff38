/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from "primereact/calendar";
const discountTypeOptions = [];
const statusOptions = [
    {
        "name": "Active",
        "value": "Active"
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

const VoucherEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [category, setCategory] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount voucherCategory
                    client
                        .service("voucherCategory")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleVoucherCategoryId } })
                        .then((res) => {
                            setCategory(res.data.map((e) => { return { name: e['categoryName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "VoucherCategory", type: "error", message: error.message || "Failed get voucherCategory" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            voucherTitle: _entity?.voucherTitle,
description: _entity?.description,
category: _entity?.category?._id,
discountType: _entity?.discountType,
discountValue: _entity?.discountValue,
minPurchaseAmount: _entity?.minPurchaseAmount,
maxDiscountAmount: _entity?.maxDiscountAmount,
startDate: _entity?.startDate,
expiryDate: _entity?.expiryDate,
quantityLimit: _entity?.quantityLimit,
status: _entity?.status,
        };

        setLoading(true);
        try {
            
        await client.service("voucher").patch(_entity._id, _data);
        const eagerResult = await client
            .service("voucher")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "category",
                    service : "voucherCategory",
                    select:["categoryName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info voucher updated successfully" });
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

    const categoryOptions = category.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Voucher" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="voucher-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="voucherTitle">Voucher Title:</label>
                <InputText id="voucherTitle" className="w-full mb-3 p-inputtext-sm" value={_entity?.voucherTitle} onChange={(e) => setValByKey("voucherTitle", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["voucherTitle"]) && (
              <p className="m-0" key="error-voucherTitle">
                {error["voucherTitle"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="description">Description:</label>
                <InputTextarea id="description" rows={5} cols={30} value={_entity?.description} onChange={ (e) => setValByKey("description", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["description"]) && (
              <p className="m-0" key="error-description">
                {error["description"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="category">Category:</label>
                <Dropdown id="category" value={_entity?.category?._id} optionLabel="name" optionValue="value" options={categoryOptions} onChange={(e) => setValByKey("category", {_id : e.value})}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["category"]) && (
              <p className="m-0" key="error-category">
                {error["category"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="discountType">Discount Type:</label>
                <Dropdown id="discountType" value={_entity?.discountType} options={discountTypeOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("discountType", e.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["discountType"]) && (
              <p className="m-0" key="error-discountType">
                {error["discountType"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="discountValue">Discount Value:</label>
                <InputNumber tooltip="Use only numbers" id="discountValue" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.discountValue} onValueChange={(e) => setValByKey("discountValue", e.value)} useGrouping={false}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["discountValue"]) && (
              <p className="m-0" key="error-discountValue">
                {error["discountValue"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="minPurchaseAmount">Min Purchase Amount:</label>
                <InputNumber tooltip="Use only numbers" id="minPurchaseAmount" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.minPurchaseAmount} onValueChange={(e) => setValByKey("minPurchaseAmount", e.value)} useGrouping={false}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["minPurchaseAmount"]) && (
              <p className="m-0" key="error-minPurchaseAmount">
                {error["minPurchaseAmount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="maxDiscountAmount">Max Discount Amount:</label>
                <InputNumber tooltip="Use only numbers" id="maxDiscountAmount" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.maxDiscountAmount} onValueChange={(e) => setValByKey("maxDiscountAmount", e.value)} useGrouping={false}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["maxDiscountAmount"]) && (
              <p className="m-0" key="error-maxDiscountAmount">
                {error["maxDiscountAmount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="startDate">Start Date:</label>
                <Calendar id="startDate"  value={_entity?.startDate ? new Date(_entity?.startDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("startDate", new Date(e.value))} showIcon showButtonBar  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["startDate"]) && (
              <p className="m-0" key="error-startDate">
                {error["startDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="expiryDate">Expiry Date:</label>
                <Calendar id="expiryDate"  value={_entity?.expiryDate ? new Date(_entity?.expiryDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("expiryDate", new Date(e.value))} showIcon showButtonBar  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["expiryDate"]) && (
              <p className="m-0" key="error-expiryDate">
                {error["expiryDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quantityLimit">Quantity Limit:</label>
                <InputNumber tooltip="Use only numbers" id="quantityLimit" className="w-full mb-3 p-inputtext-sm" value={_entity?.quantityLimit} onChange={(e) => setValByKey("quantityLimit", e.value)}  required  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quantityLimit"]) && (
              <p className="m-0" key="error-quantityLimit">
                {error["quantityLimit"]}
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

export default connect(mapState, mapDispatch)(VoucherEditDialogComponent);
