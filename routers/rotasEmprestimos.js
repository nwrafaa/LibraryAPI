const { Router } = require("express");
const router = Router();
const controllerEmprestimos = require("../controllers/controllerEmprestimos.js");

router.get("/emprestimos", (req, res) => {
    controllerEmprestimos.buscar()
        .then((emprestimo) => res.status(200).json(emprestimo))
        .catch((err) => res.status(400).json(err.message));
});

// POST
router.post("/emprestimos", (req, res) => {
        controllerEmprestimos.criar(req, res);
});


// PUT
router.put("/emprestimo/:id", (req, res) => {
    const { devolucao } = req.query; 

    if (!devolucao || !['pendente', 'devolvido'].includes(devolucao)) {
        return res.status(400).json({ erro: "Parâmetros inválidos." });
    }

    controllerEmprestimos.atualizar(req, res);
});



// DELETE
router.delete("/emprestimo/:id", (req, res) => {
    const { id } = req.params;
    controllerEmprestimos.deletar(id)
        .then(() => res.status(200).json({ sucesso: `Empréstimo ${id} deletado com sucesso!` }))
        .catch((err) => res.status(400).json(err.message));
});
//GET
router.get("/relatorios/top-livros", (req, res) => {  //Get pra livros mais emprestados 
    controllerEmprestimos.livrosMaisEmprestados(req, res);
});
//GET 
router.get("/relatorios/usuarios-pendentes", (req, res) => { //GET para usuários com pendências 
    controllerEmprestimos.usuariosComPendencias(req, res);
});

module.exports = router;