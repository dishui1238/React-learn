import React from "react";
import Form, { Field } from "./MyForm";
import Input from "./Input";

const nameRules = { required: true, message: "请输入姓名！" };
const passworRules = { required: true, message: "请输入密码！" };

export default function MyRCFieldForm(props) {
  const [form] = Form.useForm();

  const onFinish = (val) => {
    console.log("onFinish", val); //sy-log
  };

  // 表单校验失败执行
  const onFinishFailed = (val) => {
    console.log("onFinishFailed", val); //sy-log
  };

  // 函数组件初次渲染之后执行，类似componentDidMount
  // useEffect(() => {
  //   console.log("form", form); //sy-log
  //   form.setFieldValue({ username: "default" });
  // }, []);

  return (
    <div style={{ marginLeft: "10px", border: "1px solid #000" }}>
      <h3>手写表单组件</h3>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name="username" rules={[nameRules]}>
          <Input placeholder="input UR Username" />
        </Field>
        <Field name="password" rules={[passworRules]}>
          <Input placeholder="input UR Password" />
        </Field>
        <button>Submit</button>
      </Form>
    </div>
  );
}

// export default class MyRCFieldForm extends Component {
//   formRef = React.createRef();
//   form = Form.useForm();

//   componentDidMount() {
//     // this.formRef.current.setFieldValue({ username: "default" });
//   }

//   onFinish = (val) => {
//     console.log("onFinish", val); //sy-log
//   };

//   // 表单校验失败执行
//   onFinishFailed = (val) => {
//     console.log("onFinishFailed", val); //sy-log
//   };
//   render() {
//     return (
//       <div style={{ border: "1px solid blue", marginLeft: "8px" }}>
//         <h3>MyRCFieldForm</h3>
//         <Form
//           ref={this.formRef}
//           form={form}
//           onFinish={this.onFinish}
//           onFinishFailed={this.onFinishFailed}
//         >
//           <Field name="username" rules={[nameRules]}>
//             <Input placeholder="Username" />
//           </Field>
//           <Field name="password" rules={[passworRules]}>
//             <Input placeholder="Password" />
//           </Field>
//           <button>Submit</button>
//         </Form>
//       </div>
//     );
//   }
// }
