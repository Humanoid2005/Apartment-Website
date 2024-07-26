import React, { useState } from "react";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";

function AddBill(props) {
  const history = useNavigate();
  const HouseOptions = [
    {label:'All',value:'all'},{label:'001',value:'001'},{label:'002',value:'002'},
    {label:'003',value:'003'},{label:'004',value:'004'},{label:'101',value:'101'},
    {label:'102',value:'102'},{label:'103',value:'103'},{label:'104',value:'104'},
    {label:'105',value:'105'},{label:'201',value:'201'},{label:'202',value:'202'},
    {label:'203',value:'203'},{label:'204',value:'204'},{label:'205',value:'205'},
    {label:'301',value:'301'},{label:'302',value:'302'},{label:'303',value:'303'},
    {label:'304',value:'304'}
  ];

  const [selectedOptions, setSelectedOptions] = useState([{label:'Choose houses to add to bill',value:'Choose houses to add to bill'}]);
  const [deadline,setdeadline] = React.useState("");
  const [amount,setamount] = React.useState("");
  const [type,settype] = React.useState("");
  const [isDate,setisDate] = React.useState(false);

  const handleChange = (selected) => {
    if(selected.some(option => option.value === 'all')){
      selected = HouseOptions.filter(option => option.value !== 'all');
    }
    if(selected.some(option => option.value === 'Choose houses to add to bill')){
      selected = selected.filter((option)=>option.value!='Choose houses to add to bill')
    }
    setSelectedOptions(selected);
  };

  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: 700,
    }),
    control: (provided) => ({
      ...provided,
      minWidth: 700,
    }),
  };

  const handleSubmit = async () => {
    console.log("Submitting....");
    try {
      const response = await fetch('/api/add-bill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedOptions,deadline,type,amount}),
      });

      if (response.ok) {
        console.log('Data sent successfully');
        history("/admin/payments");
      } else {
        console.error('Failed to send data');
      }
      console.log("Submitted...");
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="input-div-add-bill">
    <h1>Add bill</h1>
    <div className="add-bill-grid">
      <div className="add-bill-form">
          <Select
              defaultValue={selectedOptions}
              isMulti
              name="house-numbers"
              options={HouseOptions}
              className="basic-multi-select select-input-bill"
              classNamePrefix="select"
              onChange={handleChange}
              styles={customStyles}
              value={selectedOptions}
          />
        <input className="deadline-input-bill" type="text" name="deadline" value={deadline} onChange={(event)=>{setdeadline(event.target.value)}} onFocus={(event)=>{event.target.type="date"}} placeholder="Deadline for bill payment"/>
        <input className="type-input-bill" type="text" name="type" value={type} onChange={(event)=>{settype(event.target.value)}} placeholder="Type of bill"/>
      </div>
    </div>
    <button className="add-bill-submit-button" onClick={handleSubmit}>Add Bill</button>
    </div>
  );
}

export default AddBill;
