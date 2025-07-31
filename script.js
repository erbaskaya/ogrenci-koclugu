document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    isim: form.isim.value,
    okul: form.okul.value,
    okul_duzeyi: form.okul_duzeyi.value,
    sinif: form.sinif.value,
    sinav: form.sinav.value
  };

  try {
    await axios.post("/api/save", data);
    alert("Öğrenci başarıyla kaydedildi!");
    form.reset();
    loadStudents();
  } catch (err) {
    alert("Kayıt sırasında hata oluştu.");
    console.error(err);
  }
});

async function loadStudents() {
  try {
    const res = await axios.get("/api/list");
    const listEl = document.getElementById("studentList");
    listEl.innerHTML = "";

    res.data.forEach((student, i) => {
      const item = document.createElement("div");
      item.className = "bg-white p-4 shadow rounded";
      item.innerHTML = `<strong>${i + 1} - ${student.isim}</strong> (${student.sinif})<br>${student.okul} - ${student.okul_duzeyi} (${student.sinav})`;
      listEl.appendChild(item);
    });
  } catch (err) {
    console.error("Veriler alınamadı:", err);
  }
}

window.addEventListener("DOMContentLoaded", loadStudents);
