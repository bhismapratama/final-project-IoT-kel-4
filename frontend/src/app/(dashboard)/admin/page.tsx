'use client';

import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import withAuth from '@/components/hoc/withAuth';
import Table from '@/components/table/Table';
import Typography from '@/components/Typography';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { ApiReturn } from '@/types/api';
import { DashboardUser } from '@/types/entities/dashboardUser';
import clsxm from '@/lib/clsxm';

export default withAuth(DashboardUserPage, ['authed']);

function DashboardUserPage() {
    const {
        data: cctvResponse,
        isLoading
    } = useQuery<ApiReturn<DashboardUser[]>>({ queryKey: ['/cctv'] });

    console.log(cctvResponse);
    const columns: ColumnDef<DashboardUser>[] = [
        {
            accessorKey: 'no',
            header: 'No',
            cell: props => <span>{props.row.index + 1}</span>,
        },
        {
            accessorKey: 'classs',
            header: 'Object',
            cell: props => <span>{`${props.getValue()}`}</span>,
            filterFn: (row, _id, value) => {
                return value.includes(row.getValue(_id));
            },
        },
        {
            accessorKey: 'label',
            header: 'Label',
            cell: props => <span>{`${props.getValue()}`}</span>,
            filterFn: (row, _id, value) => {
                return value.includes(row.getValue(_id));
            },
        },
        {
            accessorKey: 'createdAt',
            header: 'Waktu',
            cell: (info) => {
                const waktu_cctv = info.row.original.createdAt;
                if (!waktu_cctv) {
                    return (
                        <Typography
                            as='td'
                            className={clsxm(
                                'truncate whitespace-nowrap py-3 px-10 lg:text-[16px] text-[14px]'
                            )}
                        >
                            {' '}
                        </Typography>
                    );
                } else {
                    const waktuLengkap = waktu_cctv.toString();
                    const tanggal = waktuLengkap.split('T')[0];
                    const Jam = waktuLengkap.split('T')[1].split('.')[0];
                    const sliceDecimal = Jam.slice(0);
                    const waktuAkhir = `${tanggal} - ${sliceDecimal}`;

                    return (
                        <Typography
                            as='td'
                            className={clsxm(
                                'truncate whitespace-nowrap py-3 lg:text-[16px] text-[14px]'
                            )}
                        >
                            {waktuAkhir}
                        </Typography>
                    );
                }
            },
            filterFn: (row, _id, value) => {
                return value.includes(row.getValue(_id));
            },
        },
    ];

    return (
        <DashboardLayout>
            <section className='w-full bg-typo-surface px-10 py-10 min-h-screen flex flex-col gap-4 items-start'>
                <Typography variant='btn' font='epilogue' weight='medium'>
                    KEL 4 JAYA 3x
                </Typography>
                <Typography as='h5' variant='h5' font='epilogue' weight='semibold'>
                    CCTV DASHBOARD
                </Typography>

                <Table
                    className='text-black'
                    data={cctvResponse?.data ?? []}
                    columns={columns}
                    isLoading={isLoading}
                    withFilter
                    withPaginationControl
                    withPaginationCount
                />
            </section>
        </DashboardLayout>
    );
}
