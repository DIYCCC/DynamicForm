import React, { FC, useState } from 'react';
import { DatePicker, List } from 'antd-mobile';
import classnames from 'classnames';
import Field from '../Field';
import { INomarDatePickerProps } from '../NomarDatePicker';
import { changeDateFormat } from '../../utils';

import '../../styles/index.less';

export interface IRangeDatePickerProps extends INomarDatePickerProps {
  fieldProps2?: string;
  placeholder2?: string;
  minDate?: Date;
  maxDate?: Date;
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  secondProps?: INomarDatePickerProps;
  firstProps?: INomarDatePickerProps;
  subTitle?: string | React.ReactNode;
}

const RangeDatePicker: FC<IRangeDatePickerProps> = props => {
  const [beginDate, setBeginDate] = useState();
  const [endDate, setEndDate] = useState();
  const {
    fieldProps,
    fieldProps2,
    placeholder = '开始时间',
    placeholder2 = '结束时间',
    required = false,
    modeType = 'date',
    rules = [],
    title,
    minDate,
    maxDate,
    positionType = 'vertical',
    hasStar = true,
    secondProps,
    firstProps,
    subTitle,
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

  return (
    <>
      {isVertical && (
        <div className="alitajs-dform-vertical-title">
          {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
          <span id={fieldProps} className="alitajs-dform-title">
            {title}
          </span>
          {subTitle}
        </div>
      )}
      <div
        className={classnames({
          'alitajs-dform-range-horizontal': !isVertical,
          'alitajs-dform-range-date-picker': true,
        })}
        style={{
          justifyContent: isVertical ? 'space-between' : 'center',
          width: isVertical ? '' : '100%',
        }}
      >
        <div className={`alitajs-dform-begin${isVertical ? '-vertical' : ''}-picker`}>
          <Field
            name={fieldProps}
            rules={rules || [{ required, message: `请选择${title}` }]}
            shouldUpdate={(prevValue: any, nextValue: any) => {
              setBeginDate(nextValue && nextValue[fieldProps as any]);
              return prevValue !== nextValue;
            }}
          >
            <DatePicker
              {...otherProps}
              {...firstProps}
              mode={modeType}
              extra={placeholder}
              minDate={minDate}
              maxDate={endDate || maxDate}
              title={title}
              format={value => changeDateFormat(value, modeType)}
              onChange={e => {
                setBeginDate(e);
              }}
            >
              <List.Item>
                {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
                <span id={fieldProps} className="alitajs-dform-title">
                  {title}
                </span>
                <span id={fieldProps2}></span>
              </List.Item>
            </DatePicker>
          </Field>
        </div>
        <div className="alitajs-dform-line">~</div>
        <div className={`alitajs-dform-end${isVertical ? '-vertical' : ''}-picker`}>
          <Field
            name={fieldProps2}
            rules={rules || [{ required, message: `请选择${title}` }]}
            shouldUpdate={(prevValue: any, nextValue: any) => {
              setBeginDate(nextValue && nextValue[fieldProps2 as any]);
              return prevValue !== nextValue;
            }}
          >
            <DatePicker
              {...otherProps}
              {...secondProps}
              extra={placeholder2}
              mode={modeType}
              minDate={beginDate || minDate}
              maxDate={maxDate}
              title={title}
              format={value => changeDateFormat(value, modeType)}
              onChange={e => {
                setEndDate(e);
              }}
            >
              <List.Item arrow="horizontal"></List.Item>
            </DatePicker>
          </Field>
        </div>
      </div>
    </>
  );
};

export default RangeDatePicker;
