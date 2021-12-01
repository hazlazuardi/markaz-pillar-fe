import React from "react";
import TableData from "../../modules/TableData";
import TableDataRow from "../../modules/TableDataRow";

export default function TableView(props) {
  const {
    data,
    santriormarkaz,
    detail,
    titleTwo,
    titleThree,
    titleFour,
    titleFive,
    handleDelete,
    mutate,
  } = props;
  // array of objects
  const users = data.result;

  function fieldOne(field) {
    if (santriormarkaz === "transaksi") {
      return field.userEmail;
    } else if (santriormarkaz === "pengguna") {
      return field.fullName;
    } else {
      return field.name;
    }
  }

  function fieldTwo(field) {
    if (santriormarkaz === "santri") {
      return field.markaz.name;
    } else if (santriormarkaz === "markaz") {
      return field.category;
    } else if (santriormarkaz === "donasi") {
      return field.uniqueId;
    } else if (santriormarkaz === "transaksi") {
      return field.trxId;
    } else if (santriormarkaz === "pengguna") {
      return field.username;
    } else if (santriormarkaz === "kegiatan") {
      return "status";
    } else if (santriormarkaz === "volunteer") {
      return field.ktp;
    }
  }

  function fieldThree(field) {
    if (santriormarkaz === "santri") {
      return field.birthPlace;
    } else if (santriormarkaz === "markaz") {
      return field.contactName;
    } else if (santriormarkaz === "donasi") {
      return field.nominal;
    } else if (santriormarkaz === "transaksi") {
      return field.amount;
    } else if (santriormarkaz === "pengguna") {
      return field.email;
    } else if (santriormarkaz === "kegiatan") {
      return field.volunteerNeeded;
    } else if (santriormarkaz === "volunteer") {
      return field.email;
    }
  }

  function fieldFour(field) {
    if (santriormarkaz === "santri") {
      return genderConverter(field.gender);
    } else if (santriormarkaz === "markaz") {
      return field.contactInfo;
    } else if (santriormarkaz === "donasi") {
      return field.donated;
    } else if (santriormarkaz === "transaksi") {
      return statusConverter(field.status);
    } else if (santriormarkaz === "pengguna") {
      return field.phoneNum;
    } else if (santriormarkaz === "kegiatan") {
      return field.volunteerApplied;
    } else if (santriormarkaz === "volunteer") {
      return field.phoneNum;
    }
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
    } else if (status === "PENDAFTARAN_DITOLAK") {
      return "Pendaftaran Ditolak";
    } else if (status === "PENDAFTARAN_DITERIMA") {
      return "Pendaftaran Diterima";
    }
  }

  function fieldFive(field) {
    if (santriormarkaz === "santri") {
      return field.birthDate;
    } else if (santriormarkaz === "markaz") {
      return null;
    } else if (santriormarkaz === "donasi") {
      return field.isActive ? "Donasi Ditampilkan" : "Donasi Disembunyikan";
    } else if (santriormarkaz === "transaksi") {
      return null;
    } else if (santriormarkaz === "pengguna") {
      return field.address;
    } else if (santriormarkaz === "kegiatan") {
      return field.location;
    } else if (santriormarkaz === "volunteer") {
      return statusConverter(field.status);
    }
  }

  return (
    <TableData
      titleTwo={titleTwo}
      titleThree={titleThree}
      titleFour={titleFour}
      titleFive={titleFive}
      santriormarkaz={santriormarkaz}
    >
      {users.map((user) => (
        <TableDataRow
          key={user.id}
          id={user.id}
          nama={fieldOne(user)}
          markaz={fieldTwo(user)}
          domisili={fieldThree(user)}
          kelamin={fieldFour(user)}
          tanggal={fieldFive(user)}
          santriormarkaz={santriormarkaz}
          detail={detail}
          iddonasi={user.uniqueId}
          uniqueid={user.uniqueId}
          trxId={user.trxId}
          paymenturl={user.paymentURL}
          handleDelete={handleDelete}
          mutate={mutate}
          status={user.status}
          userdata={user}
          {...props}
        />
      ))}
    </TableData>
  );
}
