import React from "react";
import {
    PageHeader,
    Card,
    Checkbox,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Upload,
    Button,
    message,
} from "antd";
import languageActive from "../../../requests/Language/LanguageActive";
import productCharacteristicsSave from "../../../requests/ProductCharacteristics/ProductCharacteristicsSave";
import productCharacteristicsGet from "../../../requests/ProductCharacteristics/ProductCharacteristicsGet";
import { withTranslation } from "react-i18next";
import {IS_DEMO} from "../../../global";

class CharacteristicsAdd extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            keys: {},
            values: {},
            active: true,
            language: "en",
            languages: [],
            id: props.id,
            edit: props.id > 0 ? true : false,
            product_id: props.product_id,
        };

        this.onChangeProductKeys = this.onChangeProductKeys.bind(this);
        this.onChangeProductValues = this.onChangeProductValues.bind(this);
        this.onChangeLanguage = this.onChangeLanguage.bind(this);

        this.getActiveLanguages();
    }

    componentDidMount() {
        if (this.state.edit)
            setTimeout(() => this.getInfoById(this.state.id), 1000);
    }

    getInfoById = async (id) => {
        let data = await productCharacteristicsGet(id);
        if (data.data.success) {
            let products_characterics = data.data.data;
            let products_characterics_language = data.data.data["languages"];

            var keysArray = this.state.keys;
            var valuesArray = this.state.values;
            for (let i = 0; i < products_characterics_language.length; i++) {
                var lang =
                    products_characterics_language[i].language.short_name;
                keysArray[lang] = products_characterics_language[i].key;
                valuesArray[lang] = products_characterics_language[i].value;
            }

            this.setState({
                active: products_characterics.active == 1 ? true : false,
                keys: keysArray,
                values: valuesArray,
            });

            this.formRef.current.setFieldsValue({
                keys: keysArray[this.state.language],
                values: valuesArray[this.state.language],
            });
        }
    };

    getActiveLanguages = async () => {
        let data = await languageActive();
        if (data.data.success == 1 && data.data.data.length > 0) {
            this.setState({
                languages: data.data.data,
                language: data.data.data[0].short_name,
            });

            var keyArray = this.state.keys;
            var valueArray = this.state.values;

            for (let i = 0; i < data.data.data.length; i++) {
                var lang = data.data.data[i].short_name;
                keyArray[lang] = "";
                valueArray[lang] = "";
            }

            this.setState({
                keys: keyArray,
                values: valueArray,
            });
        }
    };

    onFinish = async (values) => {
        if(IS_DEMO) {
            message.warn("You cannot save in demo mode");
            return;
        }

        let data = await productCharacteristicsSave(
            this.state.product_id,
            this.state.keys,
            this.state.values,
            this.state.active,
            this.state.id
        );

        if (data.data.success == 1) {
            this.props.onSave();
        }
    };

    onFinishFailed = (errorInfo) => {};

    onChangeProductKeys = (e) => {
        var keysArray = this.state.keys;

        if (typeof keysArray[this.state.language] == "undefined")
            keysArray[this.state.language] = [];

        keysArray[this.state.language] = e.target.value;
        this.setState({
            keys: keysArray,
        });
    };

    onChangeProductValues = (e) => {
        var valuesArray = this.state.values;

        if (typeof valuesArray[this.state.language] == "undefined")
            valuesArray[this.state.language] = [];

        valuesArray[this.state.language] = e.target.value;
        this.setState({
            values: valuesArray,
        });
    };

    changeStatus = (e) => {
        this.setState({
            active: e.target.checked,
        });
    };

    onChangeLanguage = (e) => {
        // 99 805 5856
        let lang = e.target.value;
        this.setState({
            language: lang,
        });

        this.formRef.current.setFieldsValue({
            keys: this.state.keys[lang],
            values: this.state.values[lang],
        });
    };

    render() {
        const { t } = this.props;
        return (
            <PageHeader
                onBack={() => this.props.onSave()}
                className="site-page-header"
                title={
                    this.state.edit
                        ? t("product_characteristic_edit")
                        : t("product_characteristic_add")
                }
            >
                <Form
                    ref={this.formRef}
                    name="basic"
                    initialValues={{}}
                    layout="vertical"
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Card
                        style={{ marginTop: "20px" }}
                        title={t("product_characteristics")}
                    >
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <Radio.Group
                                    value={this.state.language}
                                    onChange={this.onChangeLanguage}
                                    className="float-right"
                                >
                                    {this.state.languages.map((item) => {
                                        return (
                                            <Radio.Button
                                                value={item.short_name}
                                                key={item.short_name}
                                            >
                                                {item.name}
                                            </Radio.Button>
                                        );
                                    })}
                                </Radio.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <Form.Item
                                    label={t("characteristics_key")}
                                    name="keys"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "missing_product_characteristics_key",
                                        },
                                    ]}
                                    tooltip={t(
                                        "enter_product_characteristics_key"
                                    )}
                                >
                                    <Input
                                        placeholder={t(
                                            "product_characteristics_key"
                                        )}
                                        onChange={this.onChangeProductKeys}
                                    />
                                </Form.Item>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <Form.Item
                                    label={t("characteristics_value")}
                                    name="values"
                                    rules={[
                                        {
                                            required: true,
                                            message: t(
                                                "missing_product_characteristics_value"
                                            ),
                                        },
                                    ]}
                                    tooltip={t(
                                        "enter_product_characteristics_value"
                                    )}
                                >
                                    <Input
                                        placeholder={t(
                                            "product_characteristics_value"
                                        )}
                                        onChange={this.onChangeProductValues}
                                    />
                                </Form.Item>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <Form.Item
                                    label={t("status")}
                                    name="active"
                                    tooltip={t(
                                        "uncheck_if_product_is_inactive"
                                    )}
                                >
                                    <Checkbox
                                        checked={this.state.active}
                                        onChange={this.changeStatus}
                                    >
                                        {this.state.active
                                            ? t("active")
                                            : t("inactive")}
                                    </Checkbox>
                                </Form.Item>
                            </div>
                        </div>
                    </Card>
                    <Form.Item>
                        <Button
                            type="primary"
                            className="btn-success"
                            style={{ marginTop: "40px" }}
                            htmlType="submit"
                        >
                            {t("save")}
                        </Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        );
    }
}

export default withTranslation()(CharacteristicsAdd);
