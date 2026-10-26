// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Contact form --------- */
  const form = document.getElementById('contactForm');
  const responsePara = document.getElementById('response');

  if (form && responsePara) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        responsePara.textContent = 'Please fill out all fields.';
        responsePara.style.color = 'crimson';
        return;
      }

      // Simulate submission (replace with real AJAX/Fetch call)
      console.table({ name, email, message });

      responsePara.textContent = `Thank you, ${name}. Your message has been received.`;
      responsePara.style.color = 'green';
      form.reset();
    });
  }

  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  if (toggle && links) {
    const toggleNavigation = () => {
      const isExpanded = links.classList.toggle("show");
      toggle.setAttribute("aria-expanded", String(isExpanded));
    };

    toggle.addEventListener("click", toggleNavigation);
    toggle.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleNavigation();
      }
    });
  }

  const productInterest = document.getElementById("productInterest");
  const enquiryLink = document.getElementById("enquiryLink");
  const enquiryPreview = document.getElementById("enquiryPreview");

  if (productInterest && enquiryLink && enquiryPreview) {
    const updateEnquiry = () => {
      const product = productInterest.value;
      enquiryLink.href = `mailto:pnsb@pn.com.my?subject=${encodeURIComponent(`Enquiry about ${product}`)}`;
      enquiryPreview.textContent = `We’ll connect you with the right people for ${product.toLowerCase()}.`;
    };

    productInterest.addEventListener("change", updateEnquiry);
  }

  const productGrid = document.querySelector(".catalog-grid");
  const productSearch = document.getElementById("productSearch");
  const productResults = document.getElementById("productResults");
  const productEmpty = document.getElementById("productEmpty");

  if (productGrid && productSearch && productResults && productEmpty) {
    const cards = Array.from(productGrid.querySelectorAll(".catalog-card"));
    const filters = Array.from(document.querySelectorAll(".catalog-filter"));
    let activeFilter = "all";

    const filterProducts = () => {
      const query = productSearch.value.trim().toLowerCase();
      let visibleCount = 0;

      cards.forEach((card) => {
        const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
        const matchesSearch = card.dataset.search.includes(query);
        const isVisible = matchesCategory && matchesSearch;
        card.hidden = !isVisible;
        visibleCount += Number(isVisible);
      });

      productResults.textContent = `Showing ${visibleCount} equipment ${visibleCount === 1 ? "category" : "categories"}`;
      productEmpty.hidden = visibleCount > 0;
    };

    filters.forEach((filter) => {
      const count = filter.dataset.filter === "all"
        ? cards.length
        : cards.filter((card) => card.dataset.category === filter.dataset.filter).length;
      const countElement = filter.querySelector("span");
      if (countElement) {
        countElement.textContent = String(count).padStart(2, "0");
      }

      filter.addEventListener("click", () => {
        activeFilter = filter.dataset.filter;
        filters.forEach((item) => {
          const isActive = item === filter;
          item.classList.toggle("is-active", isActive);
          item.setAttribute("aria-pressed", String(isActive));
        });
        filterProducts();
      });
    });

    productSearch.addEventListener("input", filterProducts);
    document.addEventListener("keydown", (event) => {
      if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey &&
          !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
        event.preventDefault();
        productSearch.focus();
      }
    });
  }

  const valueTabs = Array.from(document.querySelectorAll(".story-value-tab"));
  const valuePanel = document.getElementById("valuePanel");

  if (valueTabs.length && valuePanel) {
    const valueDetails = {
      care: {
        number: "01 / CARE",
        title: "CARE",
        description: "we care to maintain professional integrity and we listen and focus on our client’s requirements",
        link: "Tell us what you need",
        href: "contact.html"
      },
      respond: {
        number: "02 / RESPOND",
        title: "RESPOND",
        description: "we respond to client’s problem with definite solutions",
        link: "Explore equipment options",
        href: "product.html"
      },
      deliver: {
        number: "03 / DELIVER",
        title: "DELIVER",
        description: "we deliver goods and services to customer based on their cost requirements",
        link: "Browse the product range",
        href: "product.html"
      },
      guarantee: {
        number: "04 / GUARANTEE",
        title: "GUARANTEE",
        description: "we guarantee to give levels of excellence on our goods and services",
        link: "Talk with our team",
        href: "contact.html"
      }
    };
    const valueNumber = document.getElementById("valueNumber");
    const valueTitle = document.getElementById("valueTitle");
    const valueDescription = document.getElementById("valueDescription");
    const valueLink = document.getElementById("valueLink");

    const selectValue = (selectedTab) => {
      const detail = valueDetails[selectedTab.dataset.value];
      if (!detail || !valueNumber || !valueTitle || !valueDescription || !valueLink) {
        return;
      }

      valueTabs.forEach((tab) => {
        const isSelected = tab === selectedTab;
        tab.classList.toggle("is-active", isSelected);
        tab.setAttribute("aria-selected", String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
      });

      valuePanel.setAttribute("aria-labelledby", selectedTab.id);
      valueNumber.textContent = detail.number;
      valueTitle.textContent = detail.title;
      valueDescription.textContent = detail.description;
      valueLink.textContent = detail.link;
      valueLink.href = detail.href;
      const arrow = document.createElement("span");
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "↗";
      valueLink.append(arrow);
    };

    valueTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => selectValue(tab));
      tab.addEventListener("keydown", (event) => {
        let nextIndex;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = (index + 1) % valueTabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = (index - 1 + valueTabs.length) % valueTabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = valueTabs.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        valueTabs[nextIndex].focus();
        selectValue(valueTabs[nextIndex]);
      });
    });
  }

  const partnerTabs = Array.from(document.querySelectorAll(".partner-brand"));
  const partnerPanel = document.getElementById("brandPanel");

  if (partnerTabs.length && partnerPanel) {
    const partnerDetails = {
      akron: {
        name: "AKRON Brass",
        logo: "PICTURE/LOGO/akron-removebg-preview.png",
        category: "WATER DELIVERY / FIRE SUPPRESSION",
        description: "Browse AKRON firefighting nozzles and monitors, including handline and portable monitor options.",
        catalog: "Explore AKRON nozzles",
        catalogHref: "firefighting_nozzle.html",
        relatedCatalog: "Explore AKRON monitors",
        relatedCatalogHref: "fire_monitor.html",
        manufacturer: "https://www.akronbrass.com"
      },
      godiva: {
        name: "GODIVA",
        logo: "PICTURE/LOGO/godiva-removebg-preview.png",
        category: "PORTABLE & VEHICLE-MOUNTED PUMPS",
        description: "Explore GODIVA portable and vehicle-mounted fire pump options in our pump guide.",
        catalog: "Explore GODIVA pumps",
        catalogHref: "fire_pump.html",
        manufacturer: "https://www.godiva.co.uk"
      },
      holmatro: {
        name: "HOLMATRO",
        logo: "PICTURE/LOGO/holmatro-removebg-preview.png",
        category: "RESCUE / STABILIZATION / ACCESS",
        description: "Browse rescue tools, shoring and stabilization systems, and breaching equipment.",
        catalog: "Explore HOLMATRO equipment",
        catalogHref: "rescue_equipment.html",
        manufacturer: "https://www.holmatro.com/en/rescue"
      },
      "national-foam": {
        name: "NATIONAL FOAM",
        logo: "PICTURE/LOGO/NF-removebg-preview.png",
        category: "FOAM CONCENTRATE & DISCHARGE",
        description: "Explore foam concentrates, foam chambers and monitor equipment in our foam guide.",
        catalog: "Explore National Foam equipment",
        catalogHref: "Foam.html",
        manufacturer: "https://www.nationalfoam.com"
      },
      supplyplus: {
        name: "SUPPLY+",
        logo: "PICTURE/LOGO/supplyplus-removebg-preview.png",
        category: "LADDERS / VEHICLE ACCESS",
        description: "Explore fire service ladders and related vehicle access and storage equipment.",
        catalog: "Explore ladders & access",
        catalogHref: "Fire_Ladder.html",
        manufacturer: "https://supplyplus.com"
      }
    };
    const partnerLogo = document.getElementById("partnerLogo");
    const partnerCategory = document.getElementById("partnerCategory");
    const partnerTitle = document.getElementById("partnerTitle");
    const partnerDescription = document.getElementById("partnerDescription");
    const partnerCatalogLink = document.getElementById("partnerCatalogLink");
    const partnerRelatedLink = document.getElementById("partnerRelatedLink");
    const partnerManufacturerLink = document.getElementById("partnerManufacturerLink");
    const partnerPanelIndex = document.getElementById("partnerPanelIndex");

    const selectPartner = (selectedTab) => {
      const detail = partnerDetails[selectedTab.dataset.brand];
      const index = partnerTabs.indexOf(selectedTab);
      if (!detail || !partnerLogo || !partnerCategory || !partnerTitle ||
          !partnerDescription || !partnerCatalogLink || !partnerRelatedLink || !partnerManufacturerLink ||
          !partnerPanelIndex || index < 0) {
        return;
      }

      partnerTabs.forEach((tab) => {
        const isSelected = tab === selectedTab;
        tab.classList.toggle("is-active", isSelected);
        tab.setAttribute("aria-selected", String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
      });

      partnerPanel.setAttribute("aria-labelledby", selectedTab.id);
      partnerLogo.src = detail.logo;
      partnerLogo.alt = detail.name;
      partnerCategory.textContent = detail.category;
      partnerTitle.textContent = detail.name;
      partnerDescription.textContent = detail.description;
      partnerCatalogLink.href = detail.catalogHref;
      partnerCatalogLink.textContent = detail.catalog;
      const catalogArrow = document.createElement("span");
      catalogArrow.setAttribute("aria-hidden", "true");
      catalogArrow.textContent = "↗";
      partnerCatalogLink.append(catalogArrow);
      partnerRelatedLink.hidden = !detail.relatedCatalogHref;
      if (detail.relatedCatalog && detail.relatedCatalogHref) {
        partnerRelatedLink.href = detail.relatedCatalogHref;
        partnerRelatedLink.textContent = detail.relatedCatalog;
        const relatedArrow = document.createElement("span");
        relatedArrow.setAttribute("aria-hidden", "true");
        relatedArrow.textContent = "↗";
        partnerRelatedLink.append(relatedArrow);
      }
      partnerManufacturerLink.href = detail.manufacturer;
      partnerPanelIndex.textContent = `BRAND ${String(index + 1).padStart(2, "0")} / ${String(partnerTabs.length).padStart(2, "0")}`;
    };

    partnerTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => selectPartner(tab));
      tab.addEventListener("keydown", (event) => {
        let nextIndex;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = (index + 1) % partnerTabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = (index - 1 + partnerTabs.length) % partnerTabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = partnerTabs.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        partnerTabs[nextIndex].focus();
        selectPartner(partnerTabs[nextIndex]);
      });
    });
  }
});
