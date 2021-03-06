import React from "react";
import {
    Breadcrumb,
    Button,
    Checkbox,
    Form,
    Input,
    Layout,
    message,
    Modal,
    PageHeader,
    Select,
    Spin,
    Upload,
} from "antd";
import { Link } from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";
import { PlusOutlined } from "@ant-design/icons";
import shopActive from "../../requests/Shops/ShopActive";
import brandSave from "../../requests/Brands/BrandSave";
import brandGet from "../../requests/Brands/BrandGet";
import brandsCategoryActive from "../../requests/BrandCategories/BrandsCategoryActive";
import { withTranslation } from "react-i18next";

const { Option } = Select;
const { Content } = Layout;
import {IMAGE_PATH, IS_DEMO} from "../../global";

class BrandAdd extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            previewImage: "",
            previewVisible: false,
            previewTitle: "",
            fileList: [],
            shops: [],
            brandsCategories: [],
            active: true,
            id: props.location.state ? props.location.state.id : 0,
            edit: props.location.state ? props.location.state.edit : false,
        };

        this.getActiveShops = this.getActiveShops.bind(this);
        this.changeStatus = this.changeStatus.bind(this);

        this.getActiveShops();
        this.getActiveBrandCategories();

        if (this.state.edit) this.getInfoById(this.state.id);
    }

    getInfoById = async (id) => {
        let data = await brandGet(id);
        if (data.data.success) {
            let brand = data.data.data;
            this.setState({
                active: brand.active == 1 ? true : false,
                fileList: [
                    {
                        uid: "-1",
                        name: brand.image_url,
                        status: "done",
                        url: IMAGE_PATH + brand.image_url,
                    },
                ],
            });

            this.formRef.current.setFieldsValue({
                dragger: this.state.fileList,
                name: brand.name,
                shop: brand.id_shop,
            });
        }
    };

    getActiveShops = async () => {
        let data = await shopActive();
        if (data.data.success == 1 && data.data.data.length > 0) {
            this.setState({
                shops: data.data.data,
            });

            this.formRef.current.setFieldsValue({
                shop: data.data.data[0].id,
            });
        }
    };

    getActiveBrandCategories = async () => {
        let data = await brandsCategoryActive();
        if (data.data.success == 1 && data.data.data.length > 0) {
            this.setState({
                brandsCategories: data.data.data,
            });

            this.formRef.current.setFieldsValue({
                brand_category: data.data.data[0].id,
            });
        }
    };

    changeStatus = (e) => {
        this.setState({
            active: e.target.checked,
        });
    };

    onFinish = async (values) => {
        if(IS_DEMO) {
            message.warn("You cannot save in demo mode");
            return;
        }

        let data = await brandSave(
            values.brand_category,
            values.name,
            values.shop,
            this.state.fileList[0].name,
            this.state.active,
            this.state.id
        );

        if (data.data.success == 1) window.history.back();
    };

    onFinishFailed = (errorInfo) => {};

    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle:
                file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
        });
    };

    handleChange = ({ fileList }) => {
        fileList = fileList.map((file) => {
            if (file.response) {
                return {
                    uid: file.uid,
                    name: file.response.name,
                    status: "done",
                    url: IMAGE_PATH + file.response.name,
                };
            }
            return file;
        });

        this.setState({ fileList });
    };

    render() {
        const { t } = this.props;
        return (
            <PageLayout>
                <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>
                        <Link to="/brands" className="nav-text">
                            {t("brands")}
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {this.state.edit ? t("edit") : t("add")}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <PageHeader
                    onBack={() => window.history.back()}
                    className="site-page-header"
                    title={this.state.edit ? t("brand_edit") : t("brand_add")}
                >
                    <Content className="site-layout-background padding-20">
                        {this.state.shops.length > 0 ? (
                            <Form
                                ref={this.formRef}
                                name="basic"
                                initialValues={{}}
                                layout="vertical"
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}
                            >
                                <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                        <Form.Item
                                            label={t("brand_category")}
                                            name="brand_category"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Missing brand category",
                                                },
                                            ]}
                                            tooltip={t("select_brand_category")}
                                        >
                                            <Select
                                                placeholder={t(
                                                    "select_brand_category"
                                                )}
                                            >
                                                {this.state.brandsCategories.map(
                                                    (item) => {
                                                        return (
                                                            <Option
                                                                value={item.id}
                                                                key={item.id}
                                                            >
                                                                {item.name}
                                                            </Option>
                                                        );
                                                    }
                                                )}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <Form.Item
                                            label={t("shop")}
                                            name="shop"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Missing shop",
                                                },
                                            ]}
                                            tooltip={t("select_shop")}
                                        >
                                            <Select
                                                placeholder={t("select_shop")}
                                            >
                                                {this.state.shops.map(
                                                    (item) => {
                                                        return (
                                                            <Option
                                                                value={item.id}
                                                                key={item.id}
                                                            >
                                                                {item.name}
                                                            </Option>
                                                        );
                                                    }
                                                )}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <Form.Item
                                            label={t("name")}
                                            name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Missing brand name",
                                                },
                                            ]}
                                            tooltip={t("enter_brand_name")}
                                        >
                                            <Input placeholder={t("name")} />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-3 col-sm-12">
                                        <Form.Item
                                            label={t("image")}
                                            tooltip={t("upload_brand_image")}
                                        >
                                            <Form.Item
                                                name="dragger"
                                                valuePropName="fileList"
                                                getValueFromEvent={
                                                    this.normFile
                                                }
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Missing brand image",
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <Upload
                                                    action="/api/auth/upload"
                                                    listType="picture-card"
                                                    fileList={
                                                        this.state.fileList
                                                    }
                                                    defaultFileList={
                                                        this.state.fileList
                                                    }
                                                    onPreview={
                                                        this.handlePreview
                                                    }
                                                    onChange={this.handleChange}
                                                >
                                                    {this.state.fileList
                                                        .length >= 1 ? null : (
                                                        <div>
                                                            <PlusOutlined />
                                                            <div
                                                                style={{
                                                                    marginTop: 8,
                                                                }}
                                                            >
                                                                {t("upload")}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Upload>
                                            </Form.Item>
                                            <Modal
                                                visible={
                                                    this.state.previewVisible
                                                }
                                                title={this.state.previewTitle}
                                                footer={null}
                                                onCancel={this.handleCancel}
                                            >
                                                <img
                                                    alt="example"
                                                    style={{ width: "100%" }}
                                                    src={
                                                        this.state.previewImage
                                                    }
                                                />
                                            </Modal>
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-3 col-sm-12">
                                        <Form.Item
                                            label={t("status")}
                                            name="active"
                                            tooltip={t(
                                                "uncheck_if_brand_is_inactive"
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
                        ) : (
                            <div
                                className="d-flex flex-row justify-content-center"
                                style={{ height: "400px" }}
                            >
                                <Spin
                                    style={{
                                        marginTop: "auto",
                                        marginBottom: "auto",
                                    }}
                                    size="large"
                                />
                            </div>
                        )}
                    </Content>
                </PageHeader>
            </PageLayout>
        );
    }
}

export default withTranslation()(BrandAdd);
