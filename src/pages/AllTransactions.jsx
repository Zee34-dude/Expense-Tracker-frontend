

import { useEffect, useState, } from 'react';
import TransactionTable from '../components/TransactionTable';
import SearchIcon from '../assets/Vector (5).png'
import { ChevronDownIcon, PlusIcon } from 'lucide-react';
import CreateTransactions from '../components/Create_transaction';
import { fetchTransactions } from '../apis/Transaction.api';
import { deleteTransaction } from '../apis/Transaction.api';
import { useNavigate } from 'react-router-dom';
const AllTransactions = () => {

    const [transactions, setTransactions] = useState([]);
    const navigate=useNavigate()

    const handleDelete = async (id) => {
        const deleteId = await deleteTransaction(id)
        setTransactions(transactions.filter((t) => t.id !== id));
    };

    const handleEdit = (id) => {
        console.log('Edit transaction:', id);
        // Add edit functionality here
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchTransactions();

                setTransactions(res);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, []);
    // useEffect(()=>{
    //     console.log(transactions)
    // },[])

    // if (transactions.length < 1) {
    //     setAuthInitialized(false)
    // }


    return (
        <main className={`${transactions?.length > 0 ? 'h-screen' : 'overflow'} bg-background p-6`}>
            <div className="max-w-7xl mx-auto">
                <div className='flex items-center w-full gap-40 mb-8'>
                    <h1 className='text-3xl '>Transactions</h1>
                    <div className='flex  gap-10'>
                        <div className='flex items-center gap-2'>
                            <i className=' w-4 h-4'>
                                <img src={SearchIcon} alt="" />
                            </i>
                            <p className='text-[#555454] font-medium'>Search transactions</p>
                        </div>
                        <div className='font-medium flex  items-center '>Date <ChevronDownIcon size={20}  /> </div>
                        <div className='font-medium flex  items-center' > Category <ChevronDownIcon size={20}  />  </div>
                    </div>
                    <button onClick={()=>navigate('/transactions/add')} className='bg-[#0A3594] flex p-2 font-medium text-white gap-2 rounded-sm '>
                        <PlusIcon size={20} className='text-white text-2xl font-bold' /> Transactions
                    </button>
                </div>
                {/* <div className="mb-8">
                    <p className="text-muted-foreground">
                        Manage and track your financial transactions
                    </p>
                </div> */}
                {
                    transactions?.length > 0 ?
                        <TransactionTable
                            transactions={transactions}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                        :
                        <CreateTransactions />
                }
            </div>
        </main>
    );
}
export default AllTransactions




// [
//         {
//             id: 1,
//             date: '13/03/2025',
//             description: 'Uber ride',
//             category: 'Transport',
//             account: 'Card',
//             amount: -6000,
//         },
//         {
//             id: 2,
//             date: '12/04/2025',
//             description: 'Salary',
//             category: 'Income',
//             account: 'Direct deposit',
//             amount: 150000,
//         },
//         {
//             id: 3,
//             date: '04/05/2025',
//             description: 'Starbucks Coffee',
//             category: 'Food and Drinks',
//             account: 'Card',
//             amount: -3900,
//         },
//         {
//             id: 4,
//             date: '23/08/2025',
//             description: 'Netflix Subscription',
//             category: 'Entertainment',
//             account: 'Card',
//             amount: -2500,
//         },
//         {
//             id: 5,
//             date: '12/04/2025',
//             description: 'Gym Membership',
//             category: 'Fitness & Wellness',
//             account: 'Bank',
//             amount: -20000,
//         },
//         {
//             id: 6,
//             date: '11/04/2025',
//             description: 'Electricity Bills',
//             category: 'Utilities',
//             account: 'Bank',
//             amount: -7000,
//         },
//         {
//             id: 7,
//             date: '02/02/2025',
//             description: 'Dine-in',
//             category: 'Food & Drinks',
//             account: 'Card',
//             amount: -10000,
//         },
//         {
//             id: 8,
//             date: '16/10/2025',
//             description: 'Sportify',
//             category: 'Entertainment',
//             account: 'Card',
//             amount: -4000,
//         },
//         {
//             id: 9,
//             date: '17/06/2025',
//             description: 'Medicare Clinic Consultation',
//             category: 'Health',
//             account: 'Cash',
//             amount: -12000,
//         },
//         {
//             id: 10,
//             date: '26/06/2025',
//             description: 'Bank Deposit Transfer',
//             category: 'Income',
//             account: 'Bank',
//             amount: 200000,
//         },
//         {
//             id: 11,
//             date: '13/04/2025',
//             description: 'Footwears',
//             category: 'Shopping',
//             account: 'Cash',
//             amount: -15000,
//         },
//         {
//             id: 12,
//             date: '08/09/2025',
//             description: 'Shell Gas Station',
//             category: 'Fuel',
//             account: 'Cash',
//             amount: -9000,
//         },
//         {
//             id: 13,
//             date: '08/08/2025',
//             description: 'Shein Purchase',
//             category: 'Shopping',
//             account: 'Card',
//             amount: -19000,
//         },
//         {
//             id: 14,
//             date: '22/02/2025',
//             description: 'School fees',
//             category: 'Education',
//             account: 'Bank',
//             amount: -120000,
//         },
//         {
//             id: 15,
//             date: '26/04/2025',
//             description: 'Phone data',
//             category: 'Utilities',
//             account: 'Bank',
//             amount: -10000,
//         },
//     ]