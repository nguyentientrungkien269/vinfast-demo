import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Table from '../../admin/table/Table'
import customerApi from '../../../api/depost/customerApi'

const customerTableHead = [
    'id',
    'name',
    'phone',
    'Căn cước',
    'email',
    'password',
    'province'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.phone}</td>
        <td>{item.cccd}</td>
        <td>{item.email}</td>
        <td>{item.password}</td>
        <td>{item.province}</td>
    </tr>
)

const Customers = () => {
    const [customerData, setCustomerData] = useState([])
    useEffect(() => {
        const getCustomerApi = async () => {
            try {
                const res = await customerApi.getAll()
                setCustomerData(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getCustomerApi() 
    }, [])
    console.log(customerData)
    return (
        <>
            <h2 className="page-header">
                customers
            </h2>
            <div className="row">
                <div className="l-12">
                    <div className="card">
                        <div className="card__body">
                            <Table 
                                limit='10'
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={customerData}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Customers
