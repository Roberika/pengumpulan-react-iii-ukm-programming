import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from 'axios';

const Tugas3B = () => {

    const navigate = useNavigate();
    const [registry, setRegistry] = useState(null)
    const [student, setStudent] = useState(null)
    const npm = useParams().npm;
    const major_code = npm.substring(4, 6)
    const entrance_year = npm.substring(0, 2)
    const unique_id = parseInt(npm.substring(6, 10))
    const fetchStudents = async () => {
        const res = await axios.get("https://strapi-rygs.onrender.com/api/prodis");
        setRegistry(res)
    }

    const filterStudents = () => {
        var suspect = registry?.data.data[0].attributes.prodi[0]
        if (!studentExist(suspect)) return

        suspect = suspect.find((major) => major.kode_prodi == major_code).mahasiswa
        if (!studentExist(suspect)) return

        suspect = suspect.find((year) => year.tahun_masuk.slice(-2) == entrance_year).data
        if (!studentExist(suspect)) return

        var temp = []
        Object.keys(suspect).map((session_key) => {
            suspect[session_key].map((student) => temp.push(student))
        })
        suspect = temp.find((student) => student.id == unique_id)
        setStudent(suspect ? suspect : false);
    }

    const studentExist = (student) => {
        if (student) {
            return true
        } else {
            setStudent(false)
            return false
        }
    }

    //console.log(npm)
    //console.log(major_code)
    //console.log(entrance_year)
    //console.log(unique_id)
    //console.log(student ? student : false)

    useEffect(() => {
        fetchStudents()
    }, [])

    useEffect(() => {
        if (registry == null) return
        filterStudents()
    }, [registry])

    return (
        <>
            <table className='table-major' >
                <thead className="text-3xl">
                    <tr><th colSpan={3}>Data Mahasiswa</th></tr>
                </thead>
                {student === null ? (<tbody>
                    <tr><td colSpan={3}>Loading...</td></tr>
                </tbody>) : student == false ? (<tbody>
                    <tr><td colSpan={3}>Mahasiswa tidak terdaftar</td></tr>
                </tbody>) : (<tbody className='text-left'>
                    <tr><td>NPM</td><td>:</td><td>{npm}</td></tr>
                    <tr><td>Nama</td><td>:</td><td>{student.nama}</td></tr>
                    <tr><td>Jenis Kelamin</td><td>:</td><td>{student.jenis_kelamin === "L" ? "Laki-laki" : student.jenis_kelamin === "P" ? "Perempuan" : "?"}</td></tr>
                    <tr><td>Alamat</td><td>:</td><td>{student.alamat}</td></tr>
                    <tr><td>Hobi</td><td>:</td><td>{student.hobi.join(", ")}</td></tr>
                </tbody>)}
            </table >
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><hr />
            <p>
                useEffect harus dipisah supaya filter students jalan setelah registry berubah, <br />
                dan registry hanya berubah setelah fetchStudents() selesai. <br />
                <br />
                Bisa juga pakai {"useEffect(() = {fetchStudents(); filterStudents();})"},<br />
                tapi kalau seperti ini dia fetching tiap detik karena useEffect mendetect <br />
                semua parameter, dan karena parameter student berubah, useEffect berjalan, <br />
                mengubah student, membuat useEffect berjalan lagi ad infinitum. <br />
            </p>
        </>
    )
}

export default Tugas3B