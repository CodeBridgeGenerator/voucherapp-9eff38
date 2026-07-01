import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
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
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const VoucherUsageCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [voucherCode, setVoucherCode] = useState([])

    useEffect(() => {
        let init  = {status:"Redeemed"};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [voucherCode], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.voucherCode)) {
                error["voucherCode"] = `Voucher Code field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.customerName)) {
                error["customerName"] = `Customer Name field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.customerEmail)) {
                error["customerEmail"] = `Customer Email field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.transactionAmount)) {
                error["transactionAmount"] = `Transaction Amount field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.status)) {
                error["status"] = `Status field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            voucherCode: _entity?.voucherCode?._id,customerName: _entity?.customerName,customerEmail: _entity?.customerEmail,transactionAmount: _entity?.transactionAmount,discountAmount: _entity?.discountAmount,status: _entity?.status,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("voucherUsage").create(_data);
        const eagerResult = await client
            .service("voucherUsage")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "voucherCode",
                    service : "voucher",
                    select:["voucherCode"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Voucher Usage updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Voucher Usage" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount voucher
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
        <Dialog header="Create Voucher Usage" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="voucherUsage-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="voucherCode">Voucher Code:</label>
                <Dropdown id="voucherCode" value={_entity?.voucherCode?._id} optionLabel="name" optionValue="value" options={voucherCodeOptions} onChange={(e) => setValByKey("voucherCode", {_id : e.value})}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["voucherCode"]) ? (
              <p className="m-0" key="error-voucherCode">
                {error["voucherCode"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="customerName">Customer Name:</label>
                <InputText id="customerName" className="w-full mb-3 p-inputtext-sm" value={_entity?.customerName} onChange={(e) => setValByKey("customerName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["customerName"]) ? (
              <p className="m-0" key="error-customerName">
                {error["customerName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="customerEmail">Customer Email:</label>
                <InputText id="customerEmail" className="w-full mb-3 p-inputtext-sm" value={_entity?.customerEmail} onChange={(e) => setValByKey("customerEmail", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["customerEmail"]) ? (
              <p className="m-0" key="error-customerEmail">
                {error["customerEmail"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="transactionAmount">Transaction Amount:</label>
                <InputNumber tooltip="Use only numbers" id="transactionAmount" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.transactionAmount} onValueChange={(e) => setValByKey("transactionAmount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["transactionAmount"]) ? (
              <p className="m-0" key="error-transactionAmount">
                {error["transactionAmount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="discountAmount">Discount Amount:</label>
                <InputNumber tooltip="Use only numbers" id="discountAmount" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.discountAmount} onValueChange={(e) => setValByKey("discountAmount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["discountAmount"]) ? (
              <p className="m-0" key="error-discountAmount">
                {error["discountAmount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <Dropdown id="status" value={_entity?.status} options={statusOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("status", e.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) ? (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            ) : null}
          </small>
            </div>
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

export default connect(mapState, mapDispatch)(VoucherUsageCreateDialogComponent);
