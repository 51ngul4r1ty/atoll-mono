-- FOR THE TIMESTAMP OF THE INSERTS:
-- select now()

-- FOR ALL THREE IDS NEEDED IN THESE SCRIPTS:
-- select newuuid(), newuuid(), newuuid();

-- FOR SEEING WHAT'S IN DB TO START:
-- select * from "project";

insert into "project"
        (id,
        name,
        description,
        "createdAt",
        "updatedAt",
        version)
    values
        ('{{PROJECT_ID}}',
        '{{PROJECT_SHORT_NAME}}',
        '{{PROJECT_DESCRIPTION}}',
        '{{TIMESTAMP}}',
        '{{TIMESTAMP}}',
        0);

-- select * from "counter" order by "entityId", "entitySubtype";

insert into "counter"
        (id,
        entity,
        "entityId",
        "entitySubtype",
        "lastNumber",
        "lastCounterValue",
        "createdAt",
        "updatedAt",
        version)
    values
        ('{{ID_2}}',
        'project',
        '{{PROJECT_ID}}',
        'story',
        0,
        's-0',
        '{{TIMESTAMP}}',
        '{{TIMESTAMP}}',
        0);

insert into "counter"
        (id,
        entity,
        "entityId",
        "entitySubtype",
        "lastNumber",
        "lastCounterValue",
        "createdAt",
        "updatedAt",
        version)
    values
        ('{{ID_3}}',
        'project',
        '{{PROJECT_ID}}',
        'issue',
        0,
        'i-0',
        '{{TIMESTAMP}}',
        '{{TIMESTAMP}}',
        0);
