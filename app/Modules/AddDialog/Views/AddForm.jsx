import React from 'react';
import PropTypes from 'prop-types';
import is from 'is_js';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import Input from 'antd/lib/input';
import MachineContentRespond from '../../../ApiCenter/MachineRespond/MachineContentRespond';

const FormItem = Form.Item;
const Option = Select.Option;
const addFieldData = [
    {fieldName: 'Model', key: 'model'},
    {fieldName: 'Temp', key: 'temperature',},
    {fieldName: 'Region', key: 'region',},
    {fieldName: 'Address', key: 'address',},
];

class AddForm extends React.Component {
    constructor() {
        super();
        this.state = {
            isPassDate: false,
        };
    }

    handleSubmit = () => {
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                values = this.resetValues(values);
                return;
            }

            if (!this.state.isPassDate) {
                return;
            }

            let requestJson = {
                address: values.address,
                id: parseInt(values.id),
                model: values.model,
                region: values.region,
                status: parseInt(values.status),
                temperature: values.temperature
            };
            this.props.AddDialogActionsCreator.doAddMachineItem(requestJson);
            values = this.resetValues(values);
            this.resetForm();
            this.setState({isPassDate: false});
        });
    };

    checkId = (rule, value, callback) => {
        if(is.empty(value) || is.not.existy(value)) {
            rule.message = 'Please input data';
            callback('Error');
            return;
        }
        if(isNaN(value)) {
            rule.message = 'Please input number';
            callback('Error');
            return;
        }
        if(MachineContentRespond.machineDataItems.some(item => item.id === parseInt(value))) {
            rule.message = 'This ID already exists';
            callback('Error');
            return;
        }
        this.setState({isPassDate: true});
        callback();
    };

    resetValues = (values) => {
        Object.keys(values).forEach((key) => {
            values[key] = undefined;
        });
        return values;
    };

    resetForm = () => {
        const form = this.props.form;
        form.resetFields();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form>
                <FormItem
                    key={'id'}
                    label={'Device ID'}
                    labelCol={{span: 5}}
                    wrapperCol={{span: 17}}
                >
                    {getFieldDecorator('id', {
                        rules: [{
                            required: true,
                            message: 'Please input data',
                            whitespace: true,
                            validator: this.checkId,
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                {
                    addFieldData.map((formItem) => {
                        return (
                            <FormItem
                                key={formItem.key}
                                label={formItem.fieldName}
                                labelCol={{span: 5}}
                                wrapperCol={{span: 17}}
                            >
                                {getFieldDecorator(formItem.key, {
                                    rules: [{
                                        required: true,
                                        message: 'Please input data',
                                        whitespace: true,
                                    }],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        );
                    })
                }
                <FormItem
                    label="Status"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 17}}
                >
                    {getFieldDecorator('status', {
                        rules: [{required: true, message: 'Please select status', whitespace: true}],
                    })(
                        <Select
                            placeholder="Select a status"
                            onChange={this.handleSelectChange}
                        >
                            <Option value="0">Online</Option>
                            <Option value="1">Offline</Option>
                            <Option value="2">Error</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    wrapperCol={{span: 12, offset: 10}}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={this.handleSubmit}
                    >
                        Confirm
                    </Button>
                </FormItem>
                {this.props.dialogState ? null : this.resetForm()}
            </Form>
        );
    }
}

export default Form.create()(AddForm);

AddForm.propTypes = {
    form: PropTypes.object.isRequired,
    dialogState: PropTypes.bool.isRequired,
    AddDialogActionsCreator: PropTypes.object.isRequired
};
