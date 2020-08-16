import React, { useState } from 'react'
import Header from '../../../components/Header'
import { Container } from './styles'
import api from '../../../services/api';
import CustomSnackBar from '../../../components/CustomSnackBar';
import Pagination from '../../../components/Pagination';

export default function UserList() {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState();
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState();
    const [snack, setSnack] = useState({ type: 'success', message: '' });
    const [openSnack, setOpenSnack] = useState(false);
    const pageLimit = 20;

    async function fetchUsers(currPage) {
        try {
            const response = await api.get(`api/v1/list-users?limit=${pageLimit}&page=${currPage}`);
            if (response && response !== null && response !== undefined) {
                console.log('response')
                console.log(response)
                if (response.data && response.data !== null && response.data !== undefined) {
                    console.log('data')
                    console.log(response.data)
                    if (response.data.users && response.data.users !== null && response.data.users !== undefined) {
                        console.log('users')
                        console.log(response.data.users)
                        setUsers(response.data.users)
                        setCurrentPage(currPage);
                    }
                    if (response.data.pagination.count && response.data.pagination.count !== null && response.data.pagination.count !== undefined) {
                        console.log('total items')
                        console.log(response.data.pagination.count)
                        setTotalItems(response.data.pagination.count);
                    }
                    if (response.data.pagination.pages && response.data.pagination.pages !== null && response.data.pagination.pages !== undefined) {
                        setTotalPages(response.data.pagination.pages);
                    }
                } else {
                    setSnack({
                        type: 'error',
                        message: 'Erro ao carregar os usuários. Resposta veio vazia.',
                    });
                    setOpenSnack(true);
                }
            } else {
                setSnack({
                    type: 'error',
                    message: 'Erro ao carregar os usuários. Lista de usuários veio vazia.',
                });
                setOpenSnack(true);
            }
        } catch (error) {
            setSnack({
                type: 'error',
                message: `Erro ao carregar os usuários. Verifique sua conexão. ${error}`,
            });
            setOpenSnack(true);
        }
    }

    // React.useEffect(() => {
    //     fetchUsers(currentPage);
    // }, []);

    function onPageChanged(data) {
        console.log(data);
        const { currentPage } = data;
        console.log('CURRENT PAGE')
        console.log(currentPage)
        fetchUsers(currentPage);
    }

    return (
        <div style={{ overflow: 'auto' }}>
            <CustomSnackBar open={openSnack} setOpen={setOpenSnack} message={snack.message} type={snack.type} />
            <Header />
            <Container>
                <ul className="userListUl">
                    {users.map(user => (
                        <li key={user._id}>
                            <strong>Nome:</strong>
                            <p>{user.name}</p>
                            <strong>Tipo:</strong>
                            <p>{user.role.name}</p>
                        </li>
                    ))
                    }
                </ul>
                <div className="d-flex flex-row py-4 align-items-center pagination">
                    <Pagination totalRecords={totalItems} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={onPageChanged} />
                </div>
            </Container>
        </div >
    );
}