import React from "react";
import TableData from "../../modules/TableData";
import TableDataRow from "../../modules/TableDataRow";

export default function TableView(props) {
  const {
    data,
    santriormarkaz,
    detail,
    tableTempatMarkaz,
    tableDomisili,
    tableJenisKelamin,
    tableTanggalLahir,
    isDonasi,
    iddonasi,
    handleDelete,
  } = props;
  // array of objects
  const users = data.result;

  function Field_one(user, field) {
    if (santriormarkaz === "transaksi") {
      field = user.userEmail;
    } else if (santriormarkaz === "pengguna") {
      field = user.fullName;
    } else {
      field = user.name;
    }
    return field;
  }

  function Field_two(user) {
    if (santriormarkaz === "santri") {
      return user.markaz.name;
    } else if (santriormarkaz === "markaz") {
      return user.category;
    } else if (santriormarkaz === "donasi") {
      return user.uniqueId;
    } else if (santriormarkaz === "transaksi") {
      return user.trxId;
    } else if (santriormarkaz === "pengguna") {
      return user.username;
    }
  }

  function Field_three(user, field) {
    if (santriormarkaz === "santri") {
      field = user.birthPlace;
    } else if (santriormarkaz === "markaz") {
      field = "";
    } else if (santriormarkaz === "donasi") {
      field = user.nominal;
    } else if (santriormarkaz === "transaksi") {
      field = user.amount;
    } else if (santriormarkaz === "pengguna") {
      field = user.email;
    }
    return field;
  }

  function Field_four(user, field) {
    if (santriormarkaz === "santri") {
      field = genderConverter(user.gender);
    } else if (santriormarkaz === "markaz") {
      field = user.contactName;
    } else if (santriormarkaz === "donasi") {
      field = user.donated;
    } else if (santriormarkaz === "transaksi") {
      field = statusConverter(user.status);
    } else if (santriormarkaz === "pengguna") {
      field = user.phoneNum;
    }
    return field;
  }

  function genderConverter(gender) {
    if (gender === "LAKI_LAKI") {
      return "Laki-Laki";
    } else if (gender === "PEREMPUAN") {
      return "Perempuan";
    }
  }

  function statusConverter(status) {
    if (status === "DONASI_DITERIMA") {
      return "Donasi Diterima";
    } else if (status === "MENUNGGU_KONFIRMASI") {
      return "Menunggu Konfirmasi";
    } else if (status === "DONASI_DITOLAK") {
      return "Donasi Ditolak";
    }
  }

  function Field_five(user, field) {
    if (santriormarkaz === "santri") {
      field = user.birthDate;
    } else if (santriormarkaz === "markaz") {
      field = user.contactInfo;
    } else if (santriormarkaz === "donasi") {
      field = user.isActive ? "Donasi Ditampilkan" : "Donasi Disembunyikan";
    } else if (santriormarkaz === "transaksi") {
      field = "";
    } else if (santriormarkaz === "pengguna") {
      field = user.address;
    }

    return field;
  }

  return (
    <TableData
      tableTempatMarkaz={tableTempatMarkaz}
      tableDomisili={tableDomisili}
      tableJenisKelamin={tableJenisKelamin}
      tableTanggalLahir={tableTanggalLahir}
      santriormarkaz={santriormarkaz}
    >
      {users.map((user) => (
        <TableDataRow
          key={user.id}
          id={user.id}
          nama={Field_one(user, santriormarkaz)}
          markaz={Field_two(user, santriormarkaz)}
          domisili={Field_three(user, santriormarkaz)}
          kelamin={Field_four(user, santriormarkaz)}
          tanggal={Field_five(user, santriormarkaz)}
          // fieldsix={Field_six(user, santriormarkaz)}
          santriormarkaz={santriormarkaz}
          detail={detail}
          isDonasi={isDonasi}
          iddonasi={iddonasi}
          uniqueid={user.uniqueId}
          transid={user.trxId}
          paymenturl={user.paymentURL}
          handleDelete={handleDelete}
        />
      ))}
    </TableData>
  );
}
