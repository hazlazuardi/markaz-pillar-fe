import React from 'react'
import ShowAllTemplate from '../show_all/ShowAll'
import Card from '../../modules/Card';
import { useState } from 'react';

export default function GridView(props) {
    const { data } = props
    // array of objects
    const users = data.result
    console.log(data.result)
    return (
        <div>
            {users.map(user => (
                <Card key={user.id} name={user.name} desc={user.background}
                    intr_1="edit" intr_2="delete" />
            ))
            }
        </div>
    )
}
