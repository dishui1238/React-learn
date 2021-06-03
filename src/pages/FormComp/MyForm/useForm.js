import React from "react";

// 存储 Form 数据
class FormStore {
  constructor() {
    this.store = {}; // {name: value}
    this.fieldEntities = {}; // 存储 Field {name: this}
    this.callbacks = {}; // 存储传入的函数 {onFinish: () => {}, onFinishFailed}
  }

  // 注册 Field
  regiesterEntity = (entity) => {
    this.fieldEntities = {
      ...this.fieldEntities,
      [entity.props.name]: entity,
    };
    // 组件卸载后取消注册
    return () => delete this.fieldEntities[entity.props.name];
  };

  getFieldValue = (name) => {
    return this.store[name];
  };

  setFieldValue = (newValue) => {
    this.store = {
      ...this.store,
      ...newValue,
    };
    // 更新组件
    Object.keys(newValue).forEach((name) => {
      this.fieldEntities[name].onStoreChange();
    });
  };

  setCallback = (callbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...callbacks,
    };
  };

  validate = () => {
    let errors = [];

    Object.keys(this.fieldEntities).forEach((key) => {
      const entity = this.fieldEntities[key];
      const { rules } = entity.props;

      const rule = rules && rules[0];
      const value = this.getFieldValue(key);

      if (rule && rule.required && value === undefined) {
        errors.push({ [key]: rule.message });
      }
    });
    return errors;
  };

  submit = () => {
    const { onFinishFailed, onFinish } = this.callbacks;
    const errs = this.validate();

    if (errs.length) {
      onFinishFailed(errs, this.store);
    } else {
      onFinish(this.store);
    }
  };

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      setFieldValue: this.setFieldValue,
      regiesterEntity: this.regiesterEntity,
      setCallback: this.setCallback,
      submit: this.submit,
    };
  };
}

// 自定义 hook
// form 经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建
function useForm(form) {
  const formRef = React.useRef();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      formRef.current = new FormStore().getForm();
    }
  }
  return [formRef.current];
}

export default useForm;
