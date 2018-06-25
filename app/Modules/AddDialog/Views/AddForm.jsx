import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Select, Input} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const addFieldData = [
    {fieldName: 'Device ID', key: 'id'},
    {fieldName: 'Model', key: 'model'},
    {fieldName: 'Temp', key: 'temperature',},
    {fieldName: 'Region', key: 'region',},
    {fieldName: 'Address', key: 'address',},
];

class AddForm extends React.Component {

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            const requestJson = {
                address: values.address,
                id: values.id,
                model: values.model,
                region:values.region,
                status: parseInt(values.status),
                temperature: values.temperature
            };
            this.props.AddDialogActionsCreator.doAddMachineItem(requestJson);
        });
    };

    handleSelectChange = () => {};

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                {
                    addFieldData.map((formItem) => {
                        return (
                            <FormItem
                                key={formItem.key}
                                label={formItem.fieldName}
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 17 }}
                            >
                                {getFieldDecorator(formItem.key, {
                                    rules: [{ required: true, message: 'Please input data' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        );
                    })
                }
                <FormItem
                    label="Status"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 17 }}
                >
                    {getFieldDecorator('status', {
                        rules: [{ required: true, message: 'Please select status' }],
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
                    wrapperCol={{ span: 12, offset: 10 }}
                >
                    <Button type="primary" htmlType="submit">
                        Confirm
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(AddForm);

AddForm.propTypes = {
    form: PropTypes.object.isRequired,
    AddDialogActionsCreator: PropTypes.object.isRequired
};
