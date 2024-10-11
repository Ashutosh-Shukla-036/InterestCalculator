async function calculateSimpleInterest() {
    const a = document.getElementById("simplePrincipal").value;
    const b = document.getElementById("simpleRate").value;
    const c = document.getElementById("simpleTime").value;
    const ans = document.getElementById("simpleAns");
    const loading = document.getElementById("simpleLoading");

    if (!a || !b || !c) {
        ans.innerText = "Please fill in all fields.";
        return;
    }

    if (a < 0 || b < 0 || c < 0) {
        ans.innerText = "Please enter positive values.";
        return;
    }

    try {
        loading.style.display = "block";
        const response = await fetch("http://localhost:3000/SimpleInterest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ p: parseFloat(a), r: parseFloat(b), t: parseFloat(c) })
        });

        if (!response.ok) {
            const errorData = await response.json();
            ans.innerText = `Error: ${errorData.message}`;
            return;
        }

        const finalans = await response.json();
        ans.innerText = `Simple Interest: ${finalans.simpleInterest.toFixed(2)}`;
    } catch (error) {
        ans.innerText = `Network error: ${error.message}`;
    } finally {
        loading.style.display = "none";
    }

    document.getElementById("simplePrincipal").value = "";
    document.getElementById("simpleRate").value = "";
    document.getElementById("simpleTime").value = "";
}

async function calculateCompoundInterest() {
    const P = document.getElementById("compoundPrincipal").value;
    const R = document.getElementById("compoundRate").value;
    const T = document.getElementById("compoundTime").value;
    const N = document.getElementById("compoundN").value;
    const ans = document.getElementById("compoundAns");
    const loading = document.getElementById("compoundLoading");

    if (!P || !R || !T || !N) {
        ans.innerText = "Please fill in all fields.";
        return;
    }

    if (P < 0 || R < 0 || T < 0 || N < 0) {
        ans.innerText = "Please enter positive values.";
        return;
    }

    try {
        loading.style.display = "block";
        const response = await fetch("http://localhost:3000/CompoundInterest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ p: parseFloat(P), r: parseFloat(R), t: parseFloat(T), n: parseFloat(N) })
        });

        if (!response.ok) {
            const errorData = await response.json();
            ans.innerText = `Error: ${errorData.message}`;
            return;
        }

        const finalans = await response.json();
        ans.innerText = `Compound Interest: ${finalans.compoundInterest.toFixed(2)}`;
    } catch (error) {
        ans.innerText = `Network error: ${error.message}`;
    } finally {
        loading.style.display = "none";
    }
}