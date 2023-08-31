import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import '../App.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom"

function Tugas3A() {
    //API and Mapping Array Practice
    const [registry, setRegistry] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        const res = await axios.get("https://strapi-rygs.onrender.com/api/prodis");
        setRegistry(res.data.data[0].attributes.prodi[0]);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const toCapitalCase = (s) => {
        var sentence = ""
        s.split(" ").map((word, index) => {
            sentence += word.charAt(0).toUpperCase() + word.substring(1) + " "
        })
        return sentence.trim()
    }

    const getNPM = (year, major, id) => {
        var year_start = year.slice(-2);
        var year_end = (parseInt(year) + 4 + "").slice(-2);
        var id_formatted = ("0000" + id).slice(-4)
        return ([year_start, year_end, major, id_formatted]).join("")
    }

    const getGender = (gender) => {
        return gender === "L" ? "Laki-laki" :
            gender === "P" ? "Perempuan" : "?"
    }

    const showMajors = (major) => {
        return (
            <>
                <br />
                <table className='table-major'>
                    <thead>
                        <tr><th colSpan={3} className='title-major'>{major.nama_prodi}</th></tr>
                    </thead>
                    <tbody className='subtitle-major'>
                        <tr>
                            <td>Kepala</td>
                            <td>:</td>
                            <td>{major.kepala_prodi}</td>
                        </tr>
                        {major.sektretaris && <tr>
                            <td>Sekretaris</td>
                            <td>:</td>
                            <td>{major.sektretaris}</td>
                        </tr>}
                    </tbody>
                </table>
                <br />
                <hr />
                <br />
                {major.mahasiswa?.map((year, year_index) => {
                    return (
                        <div key={year_index} style={{ textAlign: "center" }}>
                            {showYears(year, major.kode_prodi)}
                        </div>
                    )
                })}
                <hr />
            </>
        )
    }

    const showYears = (year, major) => {
        return (
            <>
                <span className='title-year'>{year.tahun_masuk} <br /></span>
                {year.data && Object.keys(year.data).map((session_key, session_index) => {
                    return (
                        <div key={session_index}>
                            {showSessions(year.data[session_key], session_key, year.tahun_masuk, major)}
                        </div>
                    )
                })}
                <br />
            </>
        )
    };

    const showSessions = (session, session_key, year, major) => {
        return (
            <>
                <span className='title-class'>Kelas {toCapitalCase(session_key)}</span> <br />
                {session.length == 0 ? (
                    <><span>Tidak ada Mahasiswa yang mengambil kelas ini</span> <br /></>
                ) : (
                    <center>
                        <table className='table-sessions' border="1px solid black">
                            <thead>
                                <tr>
                                    <th>NPM</th>
                                    <th>Nama</th>
                                    <th>Alamat</th>
                                    <th>Jenis Kelamin</th>
                                    <th>Hobi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {session?.map((student, student_index) => {
                                    return (<tr key={student_index}>
                                        {showStudents(student, year, major)}
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </center>
                )}
                <br />
            </>
        )
    }

    const showStudents = (student, year, major) => {
        return (
            <>
                <td>
                    <button className="btn-not" onClick={() => navigate("/mahasiswa/" + getNPM(year, major, student.id))}>
                        {getNPM(year, major, student.id)}
                    </button>
                </td>
                <td>{student.nama}</td>
                <td>{student.alamat}</td>
                <td>{getGender(student.jenis_kelamin)}</td>
                <td>{student.hobi.join(", ")}</td>
            </>
        )
    }

    return (
        <>
            <h1>Daftar Mahasiswa</h1>
            <br />
            <div>
                {registry?.map((major, major_index) => {
                    return (
                        <div key={major_index}>
                            {showMajors(major)}
                        </div>
                    )
                })}
                <p>
                    <br />
                    ...
                    <br />
                </p>
            </div>
        </>
    )
}

export default Tugas3A
